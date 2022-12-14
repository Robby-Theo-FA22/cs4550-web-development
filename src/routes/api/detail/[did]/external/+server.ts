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

	const articles = (await response.json()).articles;
	const data = articles.filter((article: any) => article.source.name === storedDetail.sourceName)[0]

	/*
	// also get full article content from online
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const articleContent = await (await fetch(rv.url)).json();
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const dom = new JSDOM(articleContent, { url: rv.url });
	const article = new Readability(dom.window.document).parse();
	console.log(article?.textContent);
	const content = article?.textContent;
	*/

	return new Response(JSON.stringify(data), {
		headers: { 'content-type': 'application/json' }
	});
};