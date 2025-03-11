import { fail } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request, locals: { supabase } }) => {
		await new Promise((done) => setTimeout(done, 1000));

		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email && !password) {
			return fail(400, { error: 'Email and password are required', values: { email } });
		} else if (!email) {
			return fail(400, { error: 'Email are required', values: { email } });
		} else if (!password) {
			return fail(400, { error: 'Password are required', values: { email } });
		}

		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (!error) {
			return { success: true, message: 'Logged in successfully' };
		} else {
			return fail(401, { error: error.message, values: { email } });
			//fail(401, { error: '' });
			//await new Promise((done) => setTimeout(done, 500));
			//redirect(303, '/app/dashboard');
		}
	}
};
