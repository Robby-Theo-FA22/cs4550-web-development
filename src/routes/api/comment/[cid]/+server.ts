import { error, type RequestEvent } from '@sveltejs/kit';
import { findCommentById } from '$lib/db/Comment';

export const GET = async ({ params: { cid } }: RequestEvent) => {
	// If comment id is malformed throw a 404.
	if (!cid) {
		throw error(404);
	}

	// If the comment does not exist, throw a 404
	const commentInfo = await findCommentById(cid);
	if (!commentInfo) {
		throw error(404);
	}

	return new Response(JSON.stringify(commentInfo.toJSON()), {
		headers: { 'content-type': 'application/json' }
	});
};
