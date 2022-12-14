<script>
	import { page } from '$app/stores';
	import ProfileComment from '$lib/components/profile/ProfileComment.svelte';
	import ProfileDetail from '$lib/components/profile/ProfileDetail.svelte';

	const user = $page.data.user;
	$: socialInteraction = user.socialInteraction

	// currentUser cookie
	$: currentUser = $page.data.currentUser;

	const handleChangeSocialStatus = async () => {
		console.log('change to', !socialInteraction)
		let userUpdate = { 'socialInteraction': !socialInteraction };
		const response = fetch(`/api/user/${user._id}`, {
			method: 'POST',
			body: JSON.stringify(userUpdate)
		})

		if ((await response).ok) {
			socialInteraction = !socialInteraction;
		}
	};
</script>

<h1>{user.username}'s Profile</h1>
<hr>

<h3>Comments</h3>
{#each user.comments as cid}
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
		{#each user.likedComments as cid}
			<ProfileComment commentId={cid} />
		{:else}
			<p>Nothing here...</p>
		{/each}
	</div>
	<hr />

	<h2>Settings</h2>
	<div>
		<h3>User Type: {socialInteraction ? 'Social User' : 'Lurker'}</h3>
		<button class='btn btn-outline-success mb-3' on:click={handleChangeSocialStatus}>Change
			to {socialInteraction ? 'Lurker' : 'Social User' }</button>
	</div>
{/if}

