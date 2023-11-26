import { json } from '@sveltejs/kit';
import { z } from 'zod';

export const POST = async ({ request, locals: { prisma, user } }) => {
	const schema = z.object({
		template_id: z.number(),
		employee_id: z.number()
	});
	const body = (await request.json()) as z.infer<typeof schema>;

	const template = await prisma.email_templates.findUnique({
		where: { id: body.template_id, user_id: user.id }
	});

	const employee = await prisma.employees.findUnique({
		where: { id: body.employee_id, user_id: user.id },
		include: { business: true }
	});

	console.log({
		template,
		employee
	});

	return json({ success: true });
};
