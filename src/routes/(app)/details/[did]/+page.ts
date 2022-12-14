import type { RequestEvent } from '@sveltejs/kit';

export const load = async ({ fetch, params }: RequestEvent) => {
	const response = await fetch(`/api/detail/${params.did}/external`);
	const responseValues = await response.json();
	return {
		externalDetails: responseValues
	};
}
