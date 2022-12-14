import { error, type RequestEvent } from '@sveltejs/kit';

export const load = async ({ fetch, params }: RequestEvent) => {
	const detailsResponse = await fetch(`/api/detail/${params.did}`);
	const externalDetailsResponse = await fetch(`/api/detail/${params.did}/external`);
	const externalContentResponse = await fetch(`/api/detail/${params.did}/external/content`)

	if (!detailsResponse.ok || !externalDetailsResponse.ok || !externalContentResponse.ok) {
		throw error(503)
	}

	return {
		details: await detailsResponse.json(),
		externalDetails: await externalDetailsResponse.json(),
		externalContent: await externalContentResponse.json()
	};
};
