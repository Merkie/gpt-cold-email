import { json } from '@sveltejs/kit'

export const POST = async ({ request, locals: { prisma, user } }) => {
	const body = await request.json()
	const data = JSON.parse(body.data)

	const uniquePromises = await Promise.all(
		data.map((pair: { business: { map_id: string } }) => {
			if (!pair.business.map_id) return

			return prisma.businesses.findFirst({
				where: {
					user: {
						id: user.id,
					},
					map_id: pair.business.map_id,
				},
			})
		})
	)

	const uniquePairs = data.filter((pair: { business: { map_id: string } }, index: number) => {
		return !uniquePromises[index]
	})

	const businesses = await prisma.businesses.createMany({
		data: uniquePairs.map(
			(pair: {
				business: { map_id: string; title: string; link: string; address: string; phone: string }
			}) => ({
				user_id: user.id,
				title: pair.business.title,
				link: pair.business.link,
				address: pair.business.address,
				phone: pair.business.phone,
				map_id: pair.business.map_id,
				raw: JSON.stringify(pair.business),
			})
		),
	})

	// for businesses
	for (const pair of uniquePairs) {
		const business = await prisma.businesses.findFirst({
			where: {
				user: {
					id: user.id,
				},
				map_id: pair.business.map_id,
			},
		})
		if (!business) continue
		if (!pair.employees) continue
		if (pair.employees.length === 0) continue
		await prisma.employees.createMany({
			data: pair.employees.map(
				(employee: { name: string; roles: string[]; emails: string[]; linkedin_url: string }) => ({
					user_id: user.id,
					business_id: business.id,
					name: employee.name,
					roles: employee.roles,
					emails: employee.emails,
					linkedin_url: employee.linkedin_url,
					raw: JSON.stringify(pair.employees),
				})
			),
		})
	}

	return json({
		success: true,
	})
}
