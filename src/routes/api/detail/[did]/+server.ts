import { error, type RequestEvent } from '@sveltejs/kit';
import { findDetailById, type IDetail, updateDetail } from '$lib/db/Detail';

export const GET = async ({ params: { did } }: RequestEvent) => {
	// If detail id is malformed throw a 404.
	if (!did) {
		throw error(404);
	}

	// If the detail does not exist, throw a 404
	const storedDetail = await findDetailById(did);
	if (!storedDetail) {
		throw error(404);
	}

	return new Response(JSON.stringify(storedDetail.toJSON()), {
		headers: { 'content-type': 'application/json' }
	});
};

export const PUT = async ({ params: { did }, request, cookies }: RequestEvent) => {
	// If user id is malformed throw a 404.
	if (!did) {
		throw error(404);
	}

	const body = await request.json();
	const detailUpdate = (await body) as unknown as Partial<IDetail>;

	const response = await updateDetail(did, detailUpdate);
	if (!response.acknowledged) {
		throw error(400);
	}

	return new Response();
};
