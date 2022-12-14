import type { RequestEvent } from '@sveltejs/kit';
import { findUserByUsername, findUsers } from '$lib/db/User';

export async function GET({ url }: RequestEvent) {
	const username = url.searchParams.get('username')

	let responseBody: string;
	if (username) {
		responseBody = JSON.stringify(await findUserByUsername(username));
	} else {
		responseBody = JSON.stringify(await findUsers())
	}
	return new Response(responseBody, {
		headers: { 'content-type': 'application/json' }
	});
}
