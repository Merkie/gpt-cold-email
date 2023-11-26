export const load = async ({ locals: { prisma, user } }) => {
	const templates = await prisma.email_templates.findMany({
		where: {
			user_id: user.id
		}
	});

	const businesses = await prisma.businesses.findMany({
		where: {
			user_id: user.id
		},
		include: {
			employees: true
		}
	});

	return {
		templates,
		businesses
	};
};
