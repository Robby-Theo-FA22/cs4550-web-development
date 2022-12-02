import type { Actions } from '@sveltejs/kit';

/** Form submission actions */
export const actions: Actions = {
	/** Action for registering the user */
	default: async ({ request }) => {
		const data = await request.formData();
		// TODO register the user

		console.log('User registered:', data.get('username'));
		return { success: false };
	}
};
