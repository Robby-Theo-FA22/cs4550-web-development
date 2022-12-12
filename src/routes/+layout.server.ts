import type { RequestEvent } from '@sveltejs/kit';

// All pages get access to the currentUser cookie
export async function load({ cookies }: RequestEvent) {
	return {
		currentUser: await cookies.get('currentUser')
	};
}
