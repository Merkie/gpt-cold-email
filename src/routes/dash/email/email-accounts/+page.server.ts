export const load = async ({ locals: { prisma, user } }) => {
	const accounts = await prisma.email_accounts.findMany({
		where: {
			user_id: user.id
		}
	});

	return {
		accounts
	};
};
