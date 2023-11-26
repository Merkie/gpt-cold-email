import { json } from '@sveltejs/kit'
import { z } from 'zod'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '$env/static/private'

export const POST = async ({ request, locals: { prisma }, cookies }) => {
	const schema = z.object({
		email: z.string().email(),
		name: z.string().min(3).max(255),
		password: z.string().min(8).max(255),
	})
	const body = (await request.json()) as z.infer<typeof schema>

	if (!schema.safeParse(body).success) return json({ error: 'Invalid body' }, { status: 400 })

	const existingUser = await prisma.users.findUnique({ where: { email: body.email } })
	if (existingUser) return json({ error: 'User with email already exists' }, { status: 400 })

	const hashedPassword = await argon2.hash(body.password)

	const createdUser = await prisma.users.create({
		data: {
			email: body.email,
			name: body.name,
			password: hashedPassword,
		},
	})

	const token = jwt.sign({ id: createdUser.id }, JWT_SECRET, { expiresIn: '1d' })

	cookies.set('gptce-token', token, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 60 * 24,
		sameSite: 'lax',
	})

	return json({ token })
}
