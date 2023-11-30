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
					content: `
						Hey Chad Calder, your job today will be to write a mock email to a fake client. You will be judged on how closely you follow the style
						and tone of the example while also coming up with a creative twist and making it your own. That being said, it is not ok
						to copy from the example email directly, meaning you will have to come up with new phrasing/emojis/etc.
					
						Please examine this example email:
						\`\`\`
						Subject: ${template.subject}
						Body:
						${template.body}
						\`\`\`

						Please examine the target client you will write your mock email to:
						\`\`\`
						Name: ${employee.name}
						Title(s): ${employee.roles.join(', ')}
						Business: ${employee.business.name}
						Business Description: ${employee.business.summary || 'No summary provided.'}
						\`\`\`
						
						Once you have completed this writing task, please submit your mock email back to me in this chat.

						It is critical that your format your email exactly like how I did mine. Including the signature at the bottom, your mock email should have the same contact signature.
					`
						.split('\n')
						.map((l) => l.trim())
						.join('\n')
				}
			],
			temperature: 1.3
		});

		if (!gptResponse.choices[0].message.content) continue;

		console.log(gptResponse.choices[0].message.content);

		const subject = gptResponse.choices[0].message.content
			.split('Subject:')[1]
			.split('\n')[0]
			.trim();
		const body = gptResponse.choices[0].message.content.split('Body:')[1].trim();
		if (!subject || !body) continue;

		// this code only runs if the json is valid
		// set email subject and body, break the loop
		emailSubject = subject;
		emailBody = body;
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
