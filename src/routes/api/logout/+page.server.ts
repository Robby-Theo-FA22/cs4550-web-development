import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	/** Action for registering the user */
	default: async ({ cookies }) => {
		const username = cookies.get('currentUser');
		cookies.delete('currentUser', { path: '/' });

		console.log('User logged out:', username);
		throw redirect(303, '/home');
	}
};
