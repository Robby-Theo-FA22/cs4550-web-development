import { type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	/** Action for logging out the user */
	default: async ({ cookies }) => {
		// Delete the user's session
		const username = cookies.get('currentUser');
		cookies.delete('currentUser', { path: '/' });

		console.log('User logged out:', username);

		// Redirect them back home
		throw redirect(303, '/home');
	}
};
