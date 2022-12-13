import { error, type RequestEvent } from '@sveltejs/kit';
import { findUserById } from '$lib/db/User';

export const GET = async ({ params: { uid } }: RequestEvent) => {
	// If user id is malformed throw a 404.
	if (!uid) {
		throw error(404);
	}

	// If the user does not exist, throw a 404
	const userInfo = await findUserById(uid);
	if (!userInfo) {
		throw error(404);
	}

	return new Response(JSON.stringify(userInfo.toJSON()), {
		headers: { 'content-type': 'application/json' }
	});
};
