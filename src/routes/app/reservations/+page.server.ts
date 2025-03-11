import type { PageServerLoad } from './$types';

import { supabase } from '$lib/supabase/client';

export const load: PageServerLoad = async () => {
	const { data: reservations } = await supabase.from('reservations').select('*');
	return {
		reservations: reservations ?? []
	};
};
