import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { Database } from './database.types.ts'; // import generated types

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
			session: Session | null;
			user: User | null;
		}
		interface PageData {
			session: Session | null;
		}
		/*
		interface Locals {
			supabase: ReturnType<typeof import('@supabase/ssr').createServerClient>;
			safeGetSession: () => Promise<{ session: any; user: any }>;
		}*/
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
