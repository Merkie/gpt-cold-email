export const load = async ({ locals: { prisma, user } }) => {
	const emails = await prisma.generated_emails.findMany({
		where: {
			user_id: user.id,
			sent: false
		},
		include: {
			employee: {
				select: {
					name: true,
					roles: true,
					business_id: true
				}
			}
		}
	});

	const email_accounts = await prisma.email_accounts.findMany({
		where: {
			user_id: user.id
		}
	});

	return {
		emails,
		email_accounts
	};
};
