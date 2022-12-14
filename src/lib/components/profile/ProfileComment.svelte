<script lang='ts'>
	import { onMount } from 'svelte';

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
	<div class='card bg-light'>
		<div class='card-body'>
			<a href='/details/{detail._id}'><h4>{detail.title}</h4></a>
			<div class='card bg-light'>
				<div class='card-body'>
					<p class='mb-2'>{comment.body}</p>

					<div class='d-flex justify-content-between'>
						<div class='d-flex flex-row align-items-center'>
							<p class='small mb-0 ms-2'>~<a href='/profile/{author._id}'>{author.username}</a></p>
						</div>
						<div class='d-flex flex-row align-items-center'>
							<i class='far fa-thumbs-up ms-2 me-1 fa-s text-black'></i>
							<p class='small mb-0'>{comment.likes.length}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else}
	<p>Loading...</p>
{/if}