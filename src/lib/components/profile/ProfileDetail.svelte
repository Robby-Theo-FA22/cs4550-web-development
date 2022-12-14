<script lang='ts'>
	import { onMount } from 'svelte';

	/** The commentId of the comment */
	export let detailId: string;

	$: detail = null;

	onMount(async () => {
		const detailResponse = await fetch(`/api/detail/${detailId}`);
		detail = await detailResponse.json();
	});
</script>

{#if detail}
		<div class='card bg-light'>
			<div class='card-body'>
				<a href='/details/{detail._id}'><h4>{detail.title}</h4></a>

				<div class='d-flex justify-content-between'>
					<div class='d-flex flex-row align-items-center'>
						<i class='far fa-comment ms-2 me-1 fa-xs text-black'></i>
						<p class='small mb-0'>{detail.comments.length}</p>
					</div>
					<div class='d-flex flex-row align-items-center'>
						<i class='far fa-thumbs-up ms-2 me-1 fa-s text-black'></i>
						<p class='small mb-0'>{detail.likes.length}</p>
					</div>
				</div>
			</div>
		</div>
{:else}
	<p>Loading...</p>
{/if}