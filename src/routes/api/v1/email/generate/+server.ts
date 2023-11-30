import { json } from '@sveltejs/kit';
import { z } from 'zod';

export const POST = async ({ request, locals: { prisma, user, openai } }) => {
	const schema = z.object({
		template_id: z.number(),
		employee_id: z.number(),
		save: z.boolean().optional(),
		email: z.string().email().optional()
	});
	const body = (await request.json()) as z.infer<typeof schema>;

	const template = await prisma.email_templates.findUnique({
		where: { id: body.template_id, user_id: user.id }
	});
	if (!template) return json({ error: 'Template not found' }, { status: 404 });

	const employee = await prisma.employees.findUnique({
		where: { id: body.employee_id, user_id: user.id },
		include: { business: true }
	});
	if (!employee) return json({ error: 'Employee not found' }, { status: 404 });

	let emailSubject = '';
	let emailBody = '';

	// this runs 3 retries incase the first 2 fail
	const retries = 3;
	for (let i = 0; i < retries; i++) {
		const gptResponse = await openai.chat.completions.create({
			model: 'gpt-4-1106-preview',
			messages: [
				{
					role: 'user',
					content:
						'Hey, can you send me the new email you wrote, I just heard for corporate that its performing really well.'
				},
				{
					role: 'assistant',
					content: `Sure, here it is:\n\n\nSubject: ${template.subject}\n\nBody: ${template.body}`
				},
				{
					role: 'user',
					content: `Thanks this is perfect! Can you write me an email just like that but for ${
						employee.name
					}? They work at the ${
						employee.business.name
					}. Here I'll send you some data about the employee and the business, it'll be in JSON because that's all I have as of now. ${'```json'}\n${JSON.stringify(
						employee,
						null,
						2
					)}\n${'```'}`
				},
				{
					role: 'assistant',
					content: `For sure! I can write something just like this, keeping the same tone and style, but I will change it up and really tailor it to the employee and business so it's ultra-targeted. I'll also try and include the employee's first name in the email subject so it catches their eye! Alright give me a few minutes and I'll get back to you, I got something good in the works! I'll keep my same contact info as well.`
				},
				{
					role: 'user',
					content: `Perfect, go ahead and get back to me when you have something. I would love to see what other creative twists you can come up with! Please try and change up what you can like emojis and phrasing but stick to the same tone, style, and format as before. Please don't over-praise the decision-maker, so avoid words like "esteemed" or "luxury" when describing the business or employee, this could come off as back-handed to some. Please keep the emails short and sweet so try not to be too wordy. we really want to come across as down-to-earth and just a flat out good investment. Also, I'll need you to submit it in JSON format with the schema \`\`\`json{ subject: "", body: ""}\`\`\`, really important you keep those same key names \`subject\` and \`body\` when you submit your response. Cheers!`
				}
			],
			response_format: {
				type: 'json_object'
			}
		});

		// pull json from response
		let responseJson: {
			body: string;
			subject: string;
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
					body: z.string(),
					subject: z.string()
				})
				.safeParse(responseJson).success
		)
			continue;

		// this code only runs if the json is valid
		// set email subject and body, break the loop
		emailSubject = responseJson.subject;
		emailBody = responseJson.body;
		break;
	}

	if (!emailSubject || !emailBody)
		return json({ error: 'Failed to generate email' }, { status: 500 });

	if (body.save) {
		await prisma.generated_emails.create({
			data: {
				user_id: user.id,
				template_id: template.id,
				employee_id: employee.id,
				subject: emailSubject,
				body: emailBody,
				recipient: body.email || undefined
			}
		});
	}

	return json({ body: emailBody.replaceAll('**', ''), subject: emailSubject });
};
