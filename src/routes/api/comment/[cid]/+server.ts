import { error, type RequestEvent } from '@sveltejs/kit';
import { deleteComment, findCommentById, type IComment, updateComment } from '$lib/db/Comment';
import { findUserById, findUsersByLikedComment, updateUser } from '$lib/db/User';
import { findDetailById, updateDetail } from '$lib/db/Detail';

export const GET = async ({ params: { cid } }: RequestEvent) => {
	// If comment id is malformed throw a 404.
	if (!cid) {
		throw error(404);
	}

	// If the comment does not exist, throw a 404
	const commentInfo = await findCommentById(cid);
	if (!commentInfo) {
		throw error(404);
	}

	return new Response(JSON.stringify(commentInfo.toJSON()), {
		headers: { 'content-type': 'application/json' }
	});
};

export const PUT = async ({ params: { cid }, request }: RequestEvent) => {
	// If user id is malformed throw a 404.
	if (!cid) {
		throw error(404);
	}

	const body = await request.json();
	const commentUpdate = (await body) as unknown as Partial<IComment>;

	const response = await updateComment(cid, commentUpdate);
	if (!response.acknowledged) {
		throw error(400);
	}

	return new Response();
};

export const DELETE = async ({ params: { cid }, request }: RequestEvent) => {
	// If user id is malformed throw a 404.
	if (!cid) {
		throw error(404);
	}

	const commentToDelete = await findCommentById(cid);
	if (!commentToDelete) {
		throw error(404);
	}

	const detailToUpdate = await findDetailById(commentToDelete.detail.toString());
	if (!detailToUpdate) {
		throw error(404);
	}

	const userCommentToUpdate = await findUserById(commentToDelete.author.toString());
	if (!userCommentToUpdate) {
		throw error(404);
	}

	const detailUpdate = { comments: detailToUpdate.comments.filter((c) => c.toString() != cid) };
	updateDetail(detailToUpdate._id.toString(), detailUpdate)
		.then((result) => {
			if (!result.acknowledged) {
				throw error(500);
			}
		});

	const userUpdate = { comments: userCommentToUpdate.comments.filter((c) => c.toString() != cid) };
	updateUser(userCommentToUpdate._id.toString(), userUpdate)
		.then((result) => {
			if (!result.acknowledged) {
				throw error(500);
			}
		});

	const usersLikedCommentsToUpdate = await findUsersByLikedComment(cid);
	usersLikedCommentsToUpdate.forEach((user) => {
		const userUpdate = { likedComments: user.likedComments.filter((c) => c.toString() != cid) };
		updateUser(user._id.toString(), userUpdate)
			.then((result) => {
				if (!result.acknowledged) {
					throw error(500);
				}
			});
	});

	const deleteCommentResponse = await deleteComment(cid);
	if (!deleteCommentResponse.acknowledged) {
		throw error(500);
	}

	return new Response();
};
