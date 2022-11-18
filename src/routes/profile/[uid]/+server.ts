import type { RequestEvent } from '@sveltejs/kit'

export function GET({ params } : RequestEvent) {
	return new Response(String(params.uid));
}