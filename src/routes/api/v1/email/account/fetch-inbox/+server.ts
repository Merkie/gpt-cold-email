import cryptr from '$lib/resources/cryptr';
import { json } from '@sveltejs/kit';
import Imap from 'imap';
import { simpleParser, type ParsedMail } from 'mailparser';
import { z } from 'zod';

async function readEmails(user: string, password: string): Promise<ParsedMail[]> {
	console.log(user, password);
	return new Promise((resolve, reject) => {
		const imap = new Imap({
			user,
			password, // Use an "App Password" for Gmail
			host: 'imap.gmail.com',
			port: 993,
			tls: true,
			tlsOptions: { rejectUnauthorized: false }
		});

		imap.once('ready', () => {
			imap.openBox('INBOX', false, (err, box) => {
				if (err) {
					reject(err);
					return;
				}

				// Fetch emails from the last N days
				const sinceDate = new Date();
				sinceDate.setDate(sinceDate.getDate() - 10);

				const f = imap.seq.fetch(`${box.messages.total}:*`, {
					bodies: '',
					struct: true
				});

				const mails: ParsedMail[] = [];

				f.on('message', (msg) => {
					let buffer = '';

					msg.on('body', (stream) => {
						stream.on('data', (chunk) => {
							buffer += chunk.toString('utf8');
						});
					});

					msg.once('attributes', () => {
						simpleParser(buffer, (err, mail) => {
							if (err) {
								reject(err);
								return;
							}
							mails.push(mail);
						});
					});
				});

				f.once('error', (err) => {
					reject(err);
				});

				f.once('end', () => {
					imap.end();
					resolve(mails);
				});
			});
		});

		imap.once('error', (err: Error) => {
			reject(err);
		});

		imap.connect();
	});
}

export const POST = async ({ request, locals: { prisma, user } }) => {
	const schema = z.object({
		id: z.number()
	});
	const body = (await request.json()) as z.infer<typeof schema>;

	if (!schema.safeParse(body).success) return json({ error: 'Invalid request' }, { status: 400 });

	const account = await prisma.email_accounts.findUnique({
		where: {
			id: body.id,
			user_id: user.id
		}
	});

	if (!account) return json({ error: 'Email account not found' }, { status: 404 });

	const decryptedPassword = cryptr.decrypt(account.password);

	const emails = (await readEmails(account.email, decryptedPassword)).flat() as ParsedMail[];

	console.log(emails);

	return json({
		emails: emails.map((em) => ({
			subject: em.subject,
			from: em.from?.text,
			to: (em.to as { text: string })?.text,
			body: em.textAsHtml
		}))
	});
};
