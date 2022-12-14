import type { RequestEvent } from '@sveltejs/kit';
import { createDetail, findDetailbyTitleSource } from '$lib/db/Detail';

export async function GET({ url }: RequestEvent) {
	let existingDetail = await findDetailbyTitleSource(
		url.searchParams.get('title') || '',
		url.searchParams.get('source') || ''
	);
	if (!existingDetail) {
		existingDetail = await createDetail({
			title: url.searchParams.get('title') || '',
			sourceName: url.searchParams.get('source') || ''
		});
	}
	return new Response(JSON.stringify(existingDetail._id), {
		headers: { 'content-type': 'application/json' }
	});
}
