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
	const title = storedDetail.title.replace(/[,/#!$%^&*;:{}=\-_`~()?]/g," ").replace(/\s+/g, " ").toLowerCase()
	console.log(title)
	const endpoint = `https://newsapi.org/v2/everything?q=${title}`;

	const response = await fetch(endpoint, {
		method: 'GET',
		headers: {
			'X-API-KEY': '6d840878a1e54db1b3172a96504b1aa8'
		}
	});

	const json = (await response.json())
	const articles = json.articles
	const article = articles[0]
	if (!article) throw error(404);

	return new Response(JSON.stringify(article), {
		headers: { 'content-type': 'application/json' }
	});
};