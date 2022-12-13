import { error, type RequestEvent } from '@sveltejs/kit';

export const load = async ({ params: { uid }, fetch }: RequestEvent) => {
	// If user id is malformed throw a 404.
	if (!uid) {
		throw error(404);
	}

	// Get user details, if not found throw a 404
	const userResponse = await fetch(`/api/user/${uid}`);
	if (!userResponse.ok) {
		throw error(404);
	}

	// Return the user details to the page
	return {
		user: userResponse.json()
	};
};
