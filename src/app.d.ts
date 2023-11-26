// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient, users } from '@prisma/client'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			prisma: PrismaClient
			user: users
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
