<script lang="ts">
	import { page } from '$app/stores';
	import ProfileComment from '$lib/components/profile/ProfileComment.svelte';
	import ProfileDetail from '$lib/components/profile/ProfileDetail.svelte';

	$: user = $page.data.user;
	$: comments = user.comments;
	$: likedComments = user.likedComments;
	$: socialInteraction = user.socialInteraction;

	// currentUser cookie
	$: currentUser = $page.data.currentUser;

	const handleChangeSocialStatus = async () => {
		let userUpdate = { 'socialInteraction': !socialInteraction };
		const response = fetch(`/api/user/${user._id}`, {
			method: 'PUT',
			body: JSON.stringify(userUpdate)
		});

		if ((await response).ok) {
			socialInteraction = !socialInteraction;
		}
	};

	const deleteComment = (newComment: any) => {
		comments = comments.filter((c) => c != newComment);
	}
</script>

<h1>{user.username}'s Profile</h1>
<h3>User Type: {socialInteraction ? 'Social User' : 'Lurker'}</h3>
<hr>

{#if socialInteraction}
	<h3>Comments</h3>
	{#each comments as cid}
		<ProfileComment commentId={cid} />
	{:else }
		<p>Nothing here...</p>
	{/each}

	{#if currentUser === user.username}
		<hr />
		<div class='mb-3'>
			<h3>Your Bookmarks</h3>
			{#each user.bookmarks as did}
				<ProfileDetail detailId={did} />
			{:else}
				<p>Nothing here...</p>
			{/each}
		</div>


		<div class='mb-3'>
			<h3>Your Liked Articles</h3>
			{#each user.likedDetails as did}
				<ProfileDetail detailId={did} />
			{:else}
				<p>Nothing here...</p>
			{/each}
		</div>

		<div class='mb-3'>
			<h3>Your Liked Comments</h3>
			{#each likedComments as cid}
				<ProfileComment commentId={cid} />
			{:else}
				<p>Nothing here...</p>
			{/each}
		</div>
	{/if}
	<hr />
{/if}

{#if currentUser === user.username}
	<h2>Settings</h2>
	<div>
		<button class='btn btn-outline-success mb-3' on:click={handleChangeSocialStatus}>Change
			to {socialInteraction ? 'Lurker' : 'Social User' }</button>
	</div>
{/if}



