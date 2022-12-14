import { error, type RequestEvent } from '@sveltejs/kit';
import { findUserById, updateUser, type IUser } from '$lib/db/User';

export const GET = async ({ params: { uid } }: RequestEvent) => {
	// If user id is malformed throw a 404.
	if (!uid) {
		throw error(404);
	}

	// If the user does not exist, throw a 404
	const userInfo = await findUserById(uid);
	if (!userInfo) {
		throw error(404);
	}

	return new Response(JSON.stringify(userInfo.toJSON()), {
		headers: { 'content-type': 'application/json' }
	});
};

export const POST = async ({ params: { uid }, request, cookies }: RequestEvent) => {
	// If user id is malformed throw a 404.
	if (!uid) {
		throw error(404);
	}

	const body = await request.json();
	const userUpdate = (await body) as unknown as Partial<IUser>;

	const response = await updateUser(uid, userUpdate);
	if (!response.acknowledged) {
		throw error(400);
	}

	if (userUpdate.username != null) {
		cookies.set('currentUser', userUpdate.username, { path: '/' });
	}

	return new Response();
};
