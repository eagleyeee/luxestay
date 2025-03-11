import type { PageServerLoad } from './$types';

import { supabase } from '$lib/supabase/client';

export const load: PageServerLoad = async () => {
	const { data: customers } = await supabase.from('customers').select('*');
	return {
		customers: customers ?? []
	};
};
