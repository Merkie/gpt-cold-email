export const load = async ({ locals: { user, prisma } }) => {
	const employees = await prisma.employees.findMany({
		where: {
			user: {
				id: user.id
			}
		},
		include: {
			business: {
				select: {
					title: true
				}
			}
		}
	});

	return {
		contacts: employees
	};
};
