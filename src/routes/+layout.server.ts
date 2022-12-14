import type { RequestEvent } from '@sveltejs/kit';

// All pages get access to the currentUser cookie
export async function load({ cookies, fetch}: RequestEvent) {
	const currentUser = await cookies.get('currentUser')
	return {
		currentUser: currentUser,
		currentUserData: await (await fetch(`/api/user?username=${currentUser}`)).json()
	};
}
