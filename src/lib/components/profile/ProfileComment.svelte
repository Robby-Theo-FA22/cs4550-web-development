<script lang='ts'>
	import { onMount } from 'svelte';
	import DetailsComment from '$lib/components/details/DetailsComment.svelte';

	/** The commentId of the comment */
	export let commentId: string;

	$: comment = null;
	$: author = null;
	$: detail = null;

	onMount(async () => {
		const commentResponse = await fetch(`/api/comment/${commentId}`);
		comment = await commentResponse.json();

		const authorResponse = await fetch(`/api/user/${comment.author}`);
		author = await authorResponse.json();

		const detailResponse = await fetch(`/api/detail/${comment.detail}`);
		detail = await detailResponse.json();
	});
</script>

{#if comment && author && detail}
	<div class='card'>
		<div class='card-body'>
			<a href='/details/{detail._id}'><h4>{detail.title}</h4></a>

			<DetailsComment commentId={comment._id} />
		</div>
	</div>
{:else}
	<p>Loading...</p>
{/if}