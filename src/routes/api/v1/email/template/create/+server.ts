import { json } from '@sveltejs/kit';
import { z } from 'zod';

export const POST = async ({ request, locals: { user, prisma } }) => {
	const schema = z.object({
		name: z.string().min(1),
		subject: z.string().min(1),
		body: z.string().min(1)
	});
	const body = (await request.json()) as z.infer<typeof schema>;

	if (!schema.safeParse(body).success) return json({ error: 'Invalid body' }, { status: 400 });

	const existingTemplate = await prisma.email_templates.findFirst({
		where: {
			name: body.name,
			user_id: user.id
		}
	});

	if (existingTemplate)
		return json({ error: 'Template with that name already exists' }, { status: 400 });

	const createdTemplate = await prisma.email_templates.create({
		data: {
			name: body.name,
			subject: body.subject,
			body: body.body,
			user_id: user.id
		}
	});

	return json({ template: createdTemplate });
};
