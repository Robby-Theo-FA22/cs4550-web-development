<script lang='ts'>
	import { page } from '$app/stores';
	import DetailsComment from '$lib/components/details/DetailsComment.svelte';
	import DetailsCommentForm from '$lib/components/details/DetailsCommentForm.svelte';

	$: currentUserData = $page.data.currentUserData;
	$: currentUser = $page.data.currentUser;
	$: details = $page.data.details;
	$: likedByCurrentUser = details.likes.includes(currentUserData?._id);

	$: currentUserBookmarks = currentUserData?.bookmarks;
	$: bookmarkedByCurrentUser = currentUserBookmarks?.includes(details?._id);

	$: comments = details.comments;
	$: externalDetails = $page.data.externalDetails;
	$: externalContent = $page.data.externalContent;

	const addComment = (newComment: any) => {
		comments = [...comments, newComment];
	};

	const deleteComment = (newComment: any) => {
		comments = comments.filter((c) => c != newComment);
	};

	const handleLike = async () => {
		if (!currentUserData) return;

		let detailsUpdate;
		let userUpdate;
		if (likedByCurrentUser) {
			detailsUpdate = { 'likes': details.likes.filter((id) => id != currentUserData._id) };
			userUpdate = { 'likedDetails': currentUserData.likedDetails.filter((id) => id != details._id) };
		} else {
			detailsUpdate = { 'likes': [...details.likes, currentUserData._id] };
			userUpdate = { 'likedDetails': [...currentUserData.likedDetails, details._id] };
		}

		const detailsResponse = fetch(`/api/detail/${details._id}`, {
			method: 'PUT',
			body: JSON.stringify(detailsUpdate)
		});

		const userResponse = fetch(`/api/user/${currentUserData._id}`, {
			method: 'PUT',
			body: JSON.stringify(userUpdate)
		});

		if ((await detailsResponse).ok && (await userResponse).ok) {
			details.likes = detailsUpdate.likes;
			currentUserData.likedDetails = userUpdate.likedDetails;
		}
	};

	const handleBookmark = async () => {
		if (!currentUser) return;

		let userUpdate;
		if (bookmarkedByCurrentUser) {
			userUpdate = { 'bookmarks': currentUserData.bookmarks.filter((id) => id != details._id) };
		} else {
			userUpdate = { 'bookmarks': [...currentUserData.bookmarks, details._id] };
		}

		const userResponse = fetch(`/api/user/${currentUserData._id}`, {
			method: 'PUT',
			body: JSON.stringify(userUpdate)
		});

		if ((await userResponse).ok) {
			currentUserBookmarks = userUpdate.bookmarks;
		}
	};
</script>

{#if externalDetails}
	<div>
		<section id='intro' class='p-4 text-center bg-light'>
			<div class='d-flex justify-content-between'>
				<div class='d-flex flex-row' on:click={handleLike}>
					<i class='m-4fa-l fa-regular fa-thumbs-up text-{likedByCurrentUser ? "primary" : "black"}'></i>
				</div>
				<h1 class='mb-0 h4'>{externalDetails.title}</h1>
				<div class='d-flex flex-row-reverse' on:click={handleBookmark}>
					<i class='m-4fa-l fa-regular fa-bookmark text-{bookmarkedByCurrentUser ? "primary" : "black"}'></i>
				</div>
			</div>
		</section>

		<!--Section: Post data-mdb-->
		<section class='border-bottom text-center mb-4'>
			<img src={externalDetails.urlToImage} class='img-fluid shadow-2-strong rounded-5 mb-4' alt='' />

			<div class='row align-items-center mb-4'>
				<div class='col-lg-6 text-center text-lg-start mb-3 m-lg-0'>
							<span> Published by {externalDetails.author ?? 'Unknown Author'}
								on {new Date(externalDetails.publishedAt).toLocaleDateString("en-US", {
									weekday: 'long',
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
								</span>
				</div>
			</div>
		</section>
		<!--Section: Post data-mdb-->

		<!--Section: Text-->
		<section>
			<p>{externalContent ?? 'No content...'}</p>
			{#if currentUserData}
				<!--Section: Comments-->
				<section class='border-bottom mb-3'>
					<p class='text-center'><strong>Comments: {comments.length}</strong></p>

					{#each comments as comment}
						<DetailsComment commentId={comment} deleteComment={deleteComment} />
					{/each}
				</section>
				<!--Section: Comments-->
				{#if currentUserData.socialInteraction}
					<!--Section: Post Comment-->
					<section>
						<DetailsCommentForm addComment={addComment} />
					</section>
					<!--Section: Reply-->
				{/if}
			{/if}
		</section>
	</div>
{:else}
	<h1>This doesn't exist...</h1>
{/if}
