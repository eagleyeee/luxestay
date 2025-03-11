import { redirect, fail } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	restPassword: async ({ request, locals: { supabase }, cookies }) => {
		await new Promise((fulfil) => setTimeout(fulfil, 1000));

		const formData = await request.formData();
		const password = formData.get('password') as string;

		if (!password) {
			return fail(400, { error: 'New password are required' });
		}

		const { error } = await supabase.auth.updateUser({
			password
		});

		if (error) {
			return fail(401, { error: error.message });
		} else {
			console.log('Success');
			const { error } = await supabase.auth.signOut();

			if (error) {
				console.log(error);
			}

			cookies.getAll().forEach(({ name }) => {
				cookies.delete(name, { path: '/' });
			});

			return {
				success: true,
				message: 'Password updated successfully'
			};
		}
	}
};
