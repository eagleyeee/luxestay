import { redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies, locals: { supabase } }) => {
		await new Promise((fulfil) => setTimeout(fulfil, 1000));
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.log(error);
		}

		// Get all cookies and delete each one
		cookies.getAll().forEach(({ name }) => {
			cookies.delete(name, { path: '/' });
		});

		/*
		cookies.delete('sb-ydyaeqsqftupgjwenjyc-auth-token;', { path: '/' });
		*/

		/* Delete all Supabase cookies
		for (const name of Object.keys(cookies._headers)) {
			if (name.startsWith('sb-')) {
				cookies.delete(name, { path: '/' });
			}
		}
		
		cookies.getAll().forEach(({ name }) => {
			if (name.startsWith('sb-')) {
				cookies.delete(name, { path: '/' });
			}
		});
		*/

		redirect(307, '/auth/login');
	}
};

/*
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, cookies }) => {
	// Sign out the user
	await locals.supabase.auth.signOut();

	// Remove auth cookies
	cookies.getAll().forEach(({ name }) => {
		if (name.startsWith('sb-')) {
			cookies.delete(name, { path: '/' });
		}
	});

	// Redirect to login page
	redirect(303, '/auth/login');
};

*/
