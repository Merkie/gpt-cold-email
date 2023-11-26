import { json } from '@sveltejs/kit';
import { z } from 'zod';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export const POST = async ({ request, locals: { prisma }, cookies }) => {
	const schema = z.object({
		email: z.string().email(),
		password: z.string().min(8).max(255)
	});
	const body = (await request.json()) as z.infer<typeof schema>;

	if (!schema.safeParse(body).success) return json({ error: 'Invalid body' }, { status: 400 });

	const existingUser = await prisma.users.findUnique({ where: { email: body.email } });
	if (!existingUser) return json({ error: 'User with email does not exist' }, { status: 400 });

	if (!(await argon2.verify(existingUser.password, body.password)))
		return json({ error: 'Invalid password' }, { status: 400 });

	const token = jwt.sign({ id: existingUser.id }, JWT_SECRET, { expiresIn: '1d' });

	cookies.set('gptce-token', token, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 60 * 24,
		sameSite: 'lax'
	});

	return json({ token });
};
