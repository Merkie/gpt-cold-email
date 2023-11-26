// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient, users } from '@prisma/client';
import type openai from 'openai';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			prisma: PrismaClient;
			user: users;
			openai: openai;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
