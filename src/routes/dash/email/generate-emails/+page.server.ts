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
					business_id: true
				}
			}
		}
	});

	const businessIdsWithEmails = [...new Set(emails.map((email) => email.employee.business_id))];

	const businessesWithoutGeneratedEmails = await prisma.businesses.findMany({
		where: {
			id: {
				notIn: businessIdsWithEmails
			},
			employees: {
				some: {}
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

	const templates = await prisma.email_templates.findMany({
		where: {
			user_id: user.id
		}
	});

	return {
		emails,
		businessesWithoutGeneratedEmails,
		templates
	};
};
