<script>
	import { page } from '$app/stores';
	import Comment from '$lib/components/Comment/Comment.svelte';

	const user = $page.data.user;
</script>

<h1>{user.username}</h1>
<h2>Comments</h2>
{#each user.comments as cid}
	<Comment commentId={cid} />
	<Comment commentId={cid} />
	<Comment commentId={cid} />
{/each}
