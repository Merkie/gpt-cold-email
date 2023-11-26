export const load = async ({ locals: { user } }) => {
	return {
		name: user.name,
	}
}
