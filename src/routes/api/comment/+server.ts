import { createComment, type IComment } from '$lib/db/Comment';
import type { RequestEvent } from '@sveltejs/kit';

export const POST = async ({ request }: RequestEvent) => {
	const body = await request.json();
	const newComment = (await body) as unknown as AtLeast<IComment, 'body' | 'author' | 'detail'>;

	const response = await createComment(newComment);
	return new Response(JSON.stringify(response.toJSON()), {
		headers: { 'content-type': 'application/json' }
	});
};