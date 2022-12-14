import { error, type RequestEvent } from '@sveltejs/kit';
import { findDetailById } from '$lib/db/Detail';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

export const GET = async ({ params: { did }, fetch }: RequestEvent) => {
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

	// find article via our API
	const response = await fetch(`/api/detail/${did}/external`)
	if (!response.ok) {
		throw error(404);
	}

	const article = (await response.json());
	// also get full article content from online
	const articleContent = await (await fetch(article.url)).text();
	const dom = new JSDOM(articleContent, { url: article.url });
	const readableArticle = new Readability(dom.window.document).parse();
	const content = readableArticle?.textContent.replace(/(\s*\n\s*)+/g, "\n");

	return new Response(JSON.stringify(content), {
		headers: { 'content-type': 'application/json' }
	});
};

