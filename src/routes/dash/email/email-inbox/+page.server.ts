export const load = async ({ locals: { prisma, user }, fetch }) => {
	const emailAccounts = await prisma.email_accounts.findMany({
		where: {
			user_id: user.id
		}
	});

	const emails = await Promise.all(
		emailAccounts.map((account) =>
			fetch('/api/v1/email/account/fetch-inbox', {
				method: 'POST',
				body: JSON.stringify({
					id: account.id
				})
			})
				.then((res) => res.json())
				.then((json) => json.emails)
		)
	);

	console.log(emails);

	return {
		emails: emails.flat()
	};
};
