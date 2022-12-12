import { invalid, redirect, type Actions } from '@sveltejs/kit';
import { findUserByCredentials } from '$lib/db/User';

/** Form submission actions */
export const actions: Actions = {
	/** Action for logging in */
	default: async ({ request, cookies }) => {
		// Get username and password from login
		const data = await request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;

		// reject is username is empty
		if (!username) {
			return invalid(400, { username, missing: true });
		}

		// reject if password is empty
		if (!password) {
			return invalid(400, { password, missing: true });
		}

		// Get the user that matches the supplied credentials from the DB
		const user = await findUserByCredentials(username, password);

		// Reject if there is no user matching the credentials
		if (user == null) {
			return invalid(401, { credentials: username, invalid: true });
		}

		// Log the user in by setting the currentUser cookie to the user's username
		cookies.set('currentUser', username, { path: '/' });
		console.log('User logged in:', username);
		throw redirect(302, '/home');
	}
};
