import nodemailer from 'nodemailer';
import cryptr from '$lib/resources/cryptr';
import type { businesses, employees } from '@prisma/client';
import { json } from '@sveltejs/kit';
import type OpenAI from 'openai';
import { z } from 'zod';

async function getEmailForEmployee(openai: OpenAI, employee: employees, business: businesses) {
	const gptResponse = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo-1106',
		messages: [
			{
				role: 'user',
				content: `Hey there, I need you to determine the best email for "Archer Calder", they work at MegaCorp Houston. The most likely MegaCorp email format is "first.last@megacorp.com", with others being ["firstinitial.lastname@megacorp.com", "[first].[last]@megacorp.co.uk"]. Return it as JSON with the schema {"email":string}`
			},
			{
				role: 'assistant',
				content: JSON.stringify({ email: 'archer.calder@megacorp.com' })
			},
			{
				role: 'user',
				content: `Perfect! Now, can you please determine the best email for "${
					employee.name
				}", they work at ${business.name}. The most likely ${business.name} email format is "${
					business.most_likely_email_format
				}", with others being ${JSON.stringify(
					business.email_formats
				)}. Return it as JSON with the schema {"email":string}`
			}
		],
		response_format: {
			type: 'json_object'
		}
	});

	return JSON.parse(gptResponse.choices[0].message.content + '').email;
}

export const POST = async ({ request, locals: { user, prisma, openai } }) => {
	const schema = z.object({
		sender_id: z.number(),
		email_id: z.number()
	});
	const body = (await request.json()) as z.infer<typeof schema>;

	if (!schema.safeParse(body).success)
		return json(
			{ error: 'Invalid request body' },
			{
				status: 400
			}
		);

	const sender = await prisma.email_accounts.findUnique({
		where: {
			id: body.sender_id,
			user_id: user.id
		}
	});
	if (!sender) return json({ error: 'Invalid sender' }, { status: 400 });

	const email = await prisma.generated_emails.findUnique({
		where: {
			id: body.email_id,
			user_id: user.id
		},
		include: {
			employee: {
				include: {
					business: true
				}
			}
		}
	});
	if (!email) return json({ error: 'Invalid email' }, { status: 400 });

	const recipientAddress = await getEmailForEmployee(
		openai,
		email.employee,
		email.employee.business
	);

	const decryptedPassword = cryptr.decrypt(sender.password);

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: sender.email,
			pass: decryptedPassword
		}
	});

	try {
		await transporter.sendMail({
			from: sender.email,
			to: 'archercalder@gmail.com',
			subject: email.subject,
			text: email.body
		});
		await prisma.generated_emails.update({
			where: {
				id: email.id
			},
			data: {
				sent: true,
				sent_at: new Date(),
				sender: sender.email,
				recipient: 'archercalder@gmail.com'
			}
		});
		return json({ success: true, recipientAddress });
	} catch (error) {
		console.log(error);
		return json(
			{
				error:
					'Something went wrong, there may be an authentication error. Check the email and password, and check if you have less secure apps enabled: https://myaccount.google.com/u/2/lesssecureapps'
			},
			{ status: 500 }
		);
	}
};
