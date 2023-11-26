import cryptr from '$lib/resources/cryptr.js';
import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { z } from 'zod';

export const POST = async ({ request, locals: { user, prisma } }) => {
	const schema = z.object({
		sender_id: z.number(),
		recipient: z.string().email()
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

	if (!sender)
		return json(
			{ error: 'Invalid sender' },
			{
				status: 400
			}
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
			to: body.recipient,
			subject: 'This is a test email for your confirmation',
			text: 'Hello, this is a test email from GPT cold email. If you did not request this, please ignore. You can delete this email if you wish.'
		});
		return json({ success: true });
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
