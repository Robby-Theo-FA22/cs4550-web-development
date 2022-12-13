import { redirect, type RequestEvent } from '@sveltejs/kit';
import { findUserByUsername } from '$lib/db/User';

export const GET = async ({ cookies }: RequestEvent) => {
	// Attempt to find the logged-in user. Redirect them to log in if not logged-in.
	const userCookie = cookies.get('currentUser');
	if (!userCookie) {
		throw redirect(302, '/login');
	}

	// Get the user data for the logged-in user. If an invalid user, redirect to log in.
	const currentUser = await findUserByUsername(userCookie);
	if (!currentUser) {
		throw redirect(302, '/login');
	}

	// Redirect to the logged-in user's profile page
	throw redirect(302, `/profile/${currentUser._id}`);
};
