export const load = async ({ locals: { user, prisma } }) => {
	const businesses = await prisma.businesses.findMany({
		where: {
			user: {
				id: user.id
			}
		},
		include: {
			employees: {
				select: {
					id: true
				}
			}
		}
	});

	const businessesWithEmployeeCount = businesses.map((business) => ({
		...business,
		employees: undefined,
		employeeCount: business.employees.length
	}));

	return {
		businesses: businessesWithEmployeeCount
	};
};
