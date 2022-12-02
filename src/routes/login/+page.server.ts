import { invalid, type Actions } from '@sveltejs/kit';

/** Form submission actions */
export const actions: Actions = {
	/** Action for logging in */
	default: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');
		// const password = data.get('password');

		if (!username) {
			return invalid(400, { username, missing: true });
		}

		//const user = await db.getUser(username);
		// TODO login the user

		console.log('User logged in:', data.get('username'));
		return { success: true };
	}
};
