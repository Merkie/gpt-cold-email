import cryptr from '$lib/resources/cryptr';
import { json } from '@sveltejs/kit';
import { z } from 'zod';

export const POST = async ({ request, locals: { user, prisma } }) => {
	const schema = z.object({
		email: z.string().email(),
		password: z.string().min(1)
	});
	const body = (await request.json()) as z.infer<typeof schema>;

	if (!schema.safeParse(body).success) return json({ error: 'Invalid body' }, { status: 400 });

	const existingAccount = await prisma.email_accounts.findFirst({
		where: {
			email: body.email,
			user_id: user.id
		}
	});

	if (existingAccount)
		return json({ error: 'You already have an email account with that email' }, { status: 400 });

	const encryptedPassword = cryptr.encrypt(body.password);

	const createdAccount = await prisma.email_accounts.create({
		data: {
			email: body.email,
			password: encryptedPassword,
			user_id: user.id
		}
	});

	createdAccount.password = '';

	return json({ account: createdAccount });
};
