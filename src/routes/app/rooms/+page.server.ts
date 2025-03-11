import { supabase } from '$lib/supabase/client';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ depends }) => {
	depends('rooms');
	const { data: rooms, error } = await supabase.from('rooms').select('*');

	if (error) {
		console.error('Error fetching rooms:', error.message);
	}

	return {
		rooms: rooms ?? []
	};
};

export const actions: Actions = {
	add: async ({ request, locals: { supabase } }) => {
		await new Promise((fulfil) => setTimeout(fulfil, 1000));

		const formData = await request.formData();
		const room_number = formData.get('room_number') as string;
		const room_type = formData.get('room_type') as string;
		const price_per_night = formData.get('price_per_night') as string;
		const status = formData.get('status') as string;

		const { error } = await supabase
			.from('rooms')
			.insert([{ room_number, room_type, price_per_night, status }]);

		if (error) {
			console.log(error);
		}
	}

	/*
	update: async ({ request, locals: { supabase } }) => {
		await new Promise((fulfil) => setTimeout(fulfil, 1000));

		const formData = await request.formData();
		const room_number = formData.get('room_number') as string;
		const room_type = formData.get('room_type') as string;
		const price_per_night = formData.get('price_per_night') as string;
		const status = formData.get('status') as string;

		const { error } = await supabase
			.from('rooms')
			.update({ room_number, room_type, price_per_night, status })
			.eq('id', room_id);

		await supabase
			.channel('rooms-updates')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'rooms' }, (payload) => {
				console.log('Change received!', payload);
			})
			.subscribe();

		if (error) {
			console.log(error);
		}
	}
	*/
};

/*
		const formData = Object.fromEntries(await request.formData());

		//signupFormValidationSchema.parse(formData);
		const { room_number, room_type, price_per_night, status } = formData;
		*/
