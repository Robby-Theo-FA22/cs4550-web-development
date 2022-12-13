<script lang='ts'>
	import { onMount } from 'svelte';

	/** The commentId of the comment */
	export let commentId: string;

	$: comment = null;
	$: author = null;
	$: detail = null;

	onMount(async () => {
		const commentResponse = await fetch(`/api/comment/${commentId}`);
		if (!commentResponse.ok) {
			return;
		}
		comment = await commentResponse.json();

		const authorResponse = await fetch(`/api/user/${comment.author}`);
		if (!commentResponse.ok) {
			return;
		}

		author = await authorResponse.json();

		const detailResponse = await fetch(`/api/detail/${comment.detail}`);
		if (!commentResponse.ok) {
			return;
		}

		detail = await detailResponse.json();
	});
</script>

{#if comment && author && detail}
	<div>
		<h3 >{detail.title}</h3>
		<div class='card'>
			<div class='card-body'>
				<p>{comment.body}</p>

				<div class='d-flex justify-content-between'>
					<div class='d-flex flex-row align-items-center'>
						<p class='small mb-0 ms-2'>{author.username}</p>
					</div>
					<div class='d-flex flex-row align-items-center'>
						<i class='far fa-thumbs-up ms-2 me-1 fa-s text-black'></i>
						<p class='small mb-0'>{comment.likes.length}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}