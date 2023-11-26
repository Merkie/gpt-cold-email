import { json } from '@sveltejs/kit';
import { z } from 'zod';

export const POST = async ({ request, locals: { user, prisma } }) => {
	const schema = z.object({
		id: z.number()
	});
	const body = (await request.json()) as z.infer<typeof schema>;

	if (!schema.safeParse(body).success) return json({ error: 'Invalid request' }, { status: 400 });

	const account = await prisma.email_accounts.findUnique({
		where: {
			id: body.id,
			user_id: user.id
		}
	});

	if (!account) return json({ error: 'Email account not found' }, { status: 404 });

	await prisma.email_accounts.delete({
		where: {
			id: body.id
		}
	});

	return json({ account });
};
