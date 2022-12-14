import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }: any) => {
	const response = await fetch(`/api/detail/${params.did}`);
	const responseValues = await response.json();
	return responseValues;
}) satisfies PageLoad;
