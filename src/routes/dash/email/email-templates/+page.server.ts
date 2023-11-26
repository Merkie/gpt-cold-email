export const load = async ({ locals: { prisma, user } }) => {
	const templates = await prisma.email_templates.findMany({
		where: {
			user_id: user.id
		}
	});

	return {
		templates
	};
};
