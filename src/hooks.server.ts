import prisma from '$lib/resources/prisma'
import type { Handle } from '@sveltejs/kit'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '$env/static/private'

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.prisma = prisma

	const token = event.cookies.get('gptce-token')
	if (token) {
		try {
			const decodedToken = jwt.verify(token, JWT_SECRET) as { id: number }
			const userFromToken = await prisma.users.findUnique({
				where: {
					id: decodedToken.id,
				},
			})
			if (userFromToken) event.locals.user = userFromToken
		} catch {}
	}

	return await resolve(event)
}
