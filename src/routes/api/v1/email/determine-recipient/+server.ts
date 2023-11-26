import { json } from '@sveltejs/kit';
import { z } from 'zod';

export const POST = async ({ request, locals: { user, prisma, openai } }) => {
	const schema = z.object({
		business_id: z.number()
	});
	const body = (await request.json()) as z.infer<typeof schema>;

	if (!schema.safeParse(body).success)
		return json({ error: 'Invalid request body' }, { status: 400 });

	const business = await prisma.businesses.findFirst({
		where: {
			id: body.business_id,
			user_id: user.id
		},
		include: {
			employees: true
		}
	});

	if (!business) return json({ error: 'Invalid business ID' }, { status: 400 });

	business.raw = '';

	let employee_id = -1;
	let employee_email = '';

	const retries = 3;
	for (let i = 0; i < retries; i++) {
		const gptResponse = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo-1106',
			messages: [
				{
					role: 'user',
					content: `Hey, I heard from corporate that you've been really successful at selecting decision makers and their most likely email. So I have a job for you, can you take JSON?`
				},
				{
					role: 'assistant',
					content: `Sure! I can even respond in JSON if you'd like. Yes I have been pretty successful at picking the right employee and their email, that employee being the decision maker. I've studied businesses and their email formats so I know what's commonly used in most industries.`
				},
				{
					role: 'user',
					content: `Perfect, I'll send you some data. \`\`\`json\n${JSON.stringify(
						business,
						null,
						2
					)}\n\`\`\`If there's just one employee, go ahead and return that one it wont count against you. But if there are multiple, try to find the decision maker, eg the General Manager, CEO, Founder, etc. It could vary based on the size of the business. Please submit your response in JSON formatting, use the schema { employee_id: number, email: string }`
				}
			],
			response_format: {
				type: 'json_object'
			}
		});

		// pull json from response
		let responseJson: {
			employee_id: number;
			email: string;
		};
		try {
			responseJson = JSON.parse(gptResponse.choices[0].message.content || '{}');
		} catch {
			continue;
		}

		// validate json with zod
		if (
			!z
				.object({
					employee_id: z.number(),
					email: z.string().email()
				})
				.safeParse(responseJson).success
		)
			continue;

		// this code only runs if the json is valid
		// set employee_id and employee_email, then break out of the loop
		employee_id = responseJson.employee_id;
		employee_email = responseJson.email;
		break;
	}

	if (employee_id === -1 || employee_email === '')
		return json({ error: 'Failed to find employee' }, { status: 500 });

	const employee = business.employees.find((e) => e.id === employee_id);

	if (!employee) return json({ error: 'Failed to find employee' }, { status: 500 });

	return json({ employee, email: employee_email });
};
