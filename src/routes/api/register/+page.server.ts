import { invalid, redirect, type Actions } from '@sveltejs/kit';
import { createUser, findUserByUsername } from '$lib/db/User';

/** Form submission actions */
export const actions: Actions = {
	/** Action for registering the user */
	default: async ({ request, cookies }) => {
		// Get username and password from login
		const data = await request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;
		const verifyPassword = data.get('verifyPassword') as string;
		const social = data.get('socialUser');

		// Reject is username is empty
		if (!username) {
			return invalid(400, { username, missing: true });
		}

		// Reject if password is empty
		if (!password) {
			return invalid(400, { password, missing: true });
		}

		// Reject if password is empty
		if (!verifyPassword) {
			return invalid(400, { verifyPassword, missing: true });
		}

		// Reject if password doesn't match verification
		if (password != verifyPassword) {
			return invalid(400, { password, invalid: true });
		}

		// Look for an already existing user
		const existingUser = await findUserByUsername(username);

		// Reject if there already exists a user with that username
		if (existingUser) {
			return invalid(401, { credentials: username, invalid: true });
		}

		// Create a new user
		await createUser({
			username: username,
			password: password,
			socialInteraction: social != null
		});

		// Log the user in by setting the currentUser cookie to the user's username
		cookies.set('currentUser', username, { path: '/' });
		console.log('User registered and logged in:', username);
		throw redirect(302, '/home');
	}
};
