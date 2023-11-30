import { json } from '@sveltejs/kit';
import { z } from 'zod';

// , locals: { prisma, user }

export const POST = async ({ request }) => {
	const schema = z.array(
		z.object({
			name: z.string(),
			address: z.string(),
			links: z.array(z.string()),
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
		})
	);
	const body = (await request.json()) as z.infer<typeof schema>;

	if (!schema.safeParse(body).success) return json({ error: 'Invalid body' }, { status: 400 });

	console.log(body);

	return json({ success: true });
};
