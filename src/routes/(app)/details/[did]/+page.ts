import type { RequestEvent } from '@sveltejs/kit';

export const load = async ({ fetch, params }: RequestEvent) => {
	return {
		externalDetails: await (await fetch(`/api/detail/${params.did}/external`)).json(),
		externalContent: await (await fetch(`/api/detail/${params.did}/external/content`)).json()
	};
}
