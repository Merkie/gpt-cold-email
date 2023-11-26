import prisma from '$lib/resources/prisma';
import { redirect, type Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.prisma = prisma;

	// Token decoding and user fetching
	const token = event.cookies.get('gptce-token');
	if (token) {
		try {
			const decodedToken = jwt.verify(token, JWT_SECRET) as { id: number };
			const userFromToken = await prisma.users.findUnique({
				where: {
					id: decodedToken.id
				}
			});
			if (userFromToken) {
				userFromToken.password = '';
				event.locals.user = userFromToken;
			}
		} catch {
			// empty
		}
	}

	const isRouteDashboard = event.url.pathname.startsWith('/dash');
	const isRouteApiIgnoreAuth =
		event.url.pathname.startsWith('/api/v1/') && !event.url.pathname.startsWith('/api/v1/auth');

	// if the user is trying to access an authenticated rotue without being logged in, redirect to login
	if ((isRouteApiIgnoreAuth || isRouteDashboard) && !event.locals.user) {
		throw redirect(307, '/login');
	}

	return await resolve(event);
};
