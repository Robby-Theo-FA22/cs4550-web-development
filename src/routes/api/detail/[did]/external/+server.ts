import { error, type RequestEvent } from '@sveltejs/kit';
import { findDetailById } from '$lib/db/Detail';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

export const GET = async ({ params: { did } }: RequestEvent) => {
	// If detail id is malformed throw a 404.
	if (!did) {
		console.log('asdf');
		throw error(404);
	}

	// If the detail does not exist, throw a 404
	const storedDetail = await findDetailById(did);
	if (!storedDetail) {
		throw error(404);
	}
	// find article via API (from local storage info)
	const endpoint = `https://newsapi.org/v2/everything?q=${storedDetail.title.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g,"")}&searchIn=title`;

	const response = await fetch(endpoint, {
		method: 'GET',
		headers: {
			'X-API-KEY': '2128dfda75c54ed3b045b635f45604e9'
		}
	});

	const article = (await response.json()).articles[0];

	return new Response(JSON.stringify(article), {
		headers: { 'content-type': 'application/json' }
	});
};