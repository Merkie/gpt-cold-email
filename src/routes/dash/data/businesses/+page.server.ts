export const load = async ({ locals: { user, prisma } }) => {
	const businesses = await prisma.businesses.findMany({
		where: {
			user: {
				id: user.id
			}
		},
		include: {
			employees: {
				include: {
					generated_emails: {
						select: {
							id: true,
							sent: true
						}
					}
				}
			}
		}
	});

	const businessesWithFlags = businesses.map((business) => ({
		...business,
		employeeCount: business.employees.length,
		status: business.employees.find((e) => e.generated_emails.length > 0)
			? business.employees.find((e) => e.generated_emails.find((e) => e.sent))
				? 'EMAIL SENT'
				: 'DRAFT READY'
			: 'NO DRAFTS'
	}));

	return {
		businesses: businessesWithFlags
	};
};
