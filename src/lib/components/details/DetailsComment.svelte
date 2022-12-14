<script lang='ts'>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	$: details = $page.data.details;

	/** The commentId of the comment */
	export let commentId: string;

	export let deleteComment;

	$: currentUserData = $page.data.currentUserData;
	$: currentUser = $page.data.currentUser;
	$: comment = null;
	$: author = null;
	$: likedByCurrentUser = comment?.likes.includes(currentUserData?._id);

	onMount(async () => {
		const commentResponse = await fetch(`/api/comment/${commentId}`);
		comment = await commentResponse.json();

		const authorResponse = await fetch(`/api/user/${comment.author}`);
		author = await authorResponse.json();
	});

	const handleLike = async () => {
		if (!currentUserData) return;

		let commentUpdate;
		let userUpdate;
		if (likedByCurrentUser) {
			commentUpdate = { 'likes': comment.likes.filter((id) => id != currentUserData._id) };
			userUpdate = { 'likedComments': currentUserData.likedComments.filter((id) => id != commentId) };
		} else {
			commentUpdate = { 'likes': [...comment.likes, currentUserData._id] };
			userUpdate = { 'likedComments': [...currentUserData.likedComments, commentId] };
		}

		const commentResponse = fetch(`/api/comment/${comment._id}`, {
			method: 'PUT',
			body: JSON.stringify(commentUpdate)
		});

		const userResponse = fetch(`/api/user/${currentUserData._id}`, {
			method: 'PUT',
			body: JSON.stringify(userUpdate)
		});

		if ((await commentResponse).ok && (await userResponse).ok) {
			comment.likes = commentUpdate.likes;
			currentUserData.likedComments = userUpdate.likedComments;
		}
	};

	const handleDelete = async () => {
		fetch(`/api/comment/${commentId}`, {
			method: 'DELETE'
		}).then(() => {
			deleteComment(commentId);
		});
	};
</script>

{#if comment && author}
	<div class='mb-4 border rounded p-3 bg-light'>
		<div class='d-flex justify-content-between'>
			<div class='d-flex flex-row align-items-center'>
				<p class='mb-2'><strong><a href='/profile/{author._id}'>{author.username}</a></strong></p>
			</div>
			{#if author.username === currentUser}
				<div class='d-flex flex-row align-items-center' on:click={handleDelete}>
					<i class='fa-solid fa-x ms-2 me-1 fa-s text-black}'></i>
				</div>
			{/if}
		</div>
		<p>{comment.body}</p>

		<div class='d-flex justify-content-between'>
			<div class='d-flex flex-row align-items-center'>
				<p class='small mb-0'>
					<small>on {new Date(comment.date).toLocaleDateString("en-US", {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
					</small>
				</p>
			</div>
			<div class='d-flex flex-row align-items-center' on:click={handleLike}>
				<i class='far fa-thumbs-up ms-2 me-1 fa-s text-{likedByCurrentUser ? "primary" : "black"}'></i>
				<p class='small mb-0'>{comment.likes.length}</p>
			</div>
		</div>
	</div>
{:else }
	Loading...
{/if}