<script lang='ts'>
	import { page } from '$app/stores';

	$: details = $page.data.details;
	$: currentUserData = $page.data.currentUserData;
	export let addComment;
	let value = '';

	const handleSubmit = async () =>  {
		if (!value) return

		const newComment = {
			body: value,
			author: currentUserData._id,
			date: Date.now(),
			detail: details._id
		}

		const newCommentResponse = await fetch(`/api/comment`, {
			method: 'POST',
			body: JSON.stringify(newComment)
		});

		if (!newCommentResponse.ok) return

		const newCommentData = await newCommentResponse.json();
		const detailsUpdate = { "comments": [...details.comments, newCommentData._id ]}
		const userUpdate = { "comments": [...currentUserData.comments, newCommentData._id]}

		const detailResponse = fetch(`/api/detail/${details._id}`, {
			method: 'PUT',
			body: JSON.stringify(detailsUpdate)
		});

		const userResponse = fetch(`/api/user/${currentUserData._id}`, {
			method: 'PUT',
			body: JSON.stringify(detailsUpdate)
		});

		if ((await detailResponse).ok && (await userResponse).ok) {
			addComment(newCommentData._id);
			currentUserData.comments = userUpdate.comments;
		}

		value = '';
	}
</script>

<div>
	<p class='text-center'><strong>Leave a comment</strong></p>

	<form  on:submit|preventDefault={handleSubmit}>
		<div class='form-outline mb-4'>
			<input class='form-control' bind:value>
		</div>

		<button type='submit' class='btn btn-primary btn-block mb-4'> Post Comment</button>
	</form>
</div>