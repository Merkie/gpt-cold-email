import type { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';
import { z } from 'zod';

const inputGroupSchema = z.object({
	name: z.string(),
	address: z.string(),
	links: z.array(z.string()),
	summary: z.string(),
	emails: z.array(z.string()),
	phones: z.array(z.string()),
	metadata: z.any(),
	employees: z.array(
		z.object({
			name: z.string(),
			roles: z.array(z.string()),
			links: z.array(z.string()),
			phones: z.array(z.string())
		})
	),
	emailFormats: z.object({
		mostLikely: z.string(),
		emailFormats: z.array(z.string())
	})
});

type InputGroup = z.infer<typeof inputGroupSchema>;

async function CreateBusinessWithEmployees(
	inputGroup: InputGroup,
	prisma: PrismaClient,
	userId: number
) {
	return prisma.$transaction(async (tx) => {
		const business = await tx.businesses.create({
			data: {
				user_id: userId,
				name: inputGroup.name || '',
				address: inputGroup.address || '',
				summary: inputGroup.summary || '',
				links: inputGroup.links || [],
				emails: inputGroup.emails,
				phones: inputGroup.phones,
				metadata: inputGroup.metadata,
				email_formats: inputGroup.emailFormats.emailFormats,
				most_likely_email_format: inputGroup.emailFormats.mostLikely
			}
		});

		await tx.employees.createMany({
			data: inputGroup.employees.map((employee) => ({
				user_id: userId,
				business_id: business.id,
				name: employee.name,
				roles: employee.roles,
				links: employee.links,
				phones: employee.phones
			}))
		});

		return business.id;
	});
}

export const POST = async ({ request, locals: { user, prisma } }) => {
	const body = await request.json();

	if (!body) return json({ error: 'No body' }, { status: 400 });
	if (!Array.isArray(body)) return json({ error: 'Body is not an array' }, { status: 400 });

	const uploadedGroupedItems = body
		.map((item) => {
			const isValid = inputGroupSchema.safeParse(item);
			if (isValid.success) return item;
			return undefined;
		})
		.filter(Boolean);

	await Promise.all(
		uploadedGroupedItems.map((inputGroup) =>
			CreateBusinessWithEmployees(inputGroup, prisma, user.id)
		)
	);

	return json({ success: true });
};
