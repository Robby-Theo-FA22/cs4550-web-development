import { error, type RequestEvent } from '@sveltejs/kit';
import { findDetailById } from '$lib/db/Detail';

export const GET = async ({ params: { did } }: RequestEvent) => {
	// If comment id is malformed throw a 404.
	if (!did) {
		throw error(404);
	}

	// If the comment does not exist, throw a 404
	const commentInfo = await findDetailById(did);
	if (!commentInfo) {
		throw error(404);
	}

	return new Response(JSON.stringify(commentInfo.toJSON()), {
		headers: { 'content-type': 'application/json' }
	});
};
