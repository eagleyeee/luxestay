import { fail } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	forgotPassword: async ({ request, url, locals: { supabase } }) => {
		await new Promise((fulfil) => setTimeout(fulfil, 1000));

		const formData = await request.formData();
		const email = formData.get('email') as string;

		if (!email) {
			return fail(400, { error: 'Email are required', values: { email } });
		}

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${url.origin}/auth/reset-password`
		});

		if (error) {
			return fail(401, { error: error.message, values: { email } });
		} else {
			return {
				success: true,
				message: 'If registered, you will receive a password reset instructions.'
			};
		}
	}
};
