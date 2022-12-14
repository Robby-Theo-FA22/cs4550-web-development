<script src="../assets/dist/js/bootstrap.bundle.min.js" lang='ts'>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import DetailsComment from '$lib/components/details/DetailsComment.svelte';
	import DetailsCommentForm from '$lib/components/details/DetailsCommentForm.svelte';

	function group(articles) {
		return [
			[articles[0], articles[1]],
			[articles[2], articles[3]],
			[articles[4], articles[5]]
		];
	}

	let featuredArticles;
	onMount(async () => {
		// change endpoint depending on whether used is logged in or not and depending on their preferences?
		let newsapiEndpoint = 'https://newsapi.org/v2/top-headlines?sortBy=popularity&language=en';
		const response = await fetch(newsapiEndpoint, {
			method: 'GET',
			headers: {
				'X-API-KEY': '6d840878a1e54db1b3172a96504b1aa8'
			}
		})
			.then((response) => response.json())
			.then((data) => (featuredArticles = group(data.articles.slice(0, 6))))
			.catch((error) => console.log(error));
	});

	// create a Detail object for the given article if one does not exist in the database, then redirect to details page
	async function createDetailAndRedirect(title, source) {
		const response = await fetch(`/api/search?title=${title}&source=${source}`);
		let responseValues = await response.json();
		console.log(responseValues);
		goto(`/details/${responseValues}`);
	}

	$: currentUserData = $page.data.currentUserData;

	let details;
	let externalDetails;
	let externalContent;
	$: if (currentUserData) {
		if (currentUserData.likedDetails.length !== 0) {
			fetch(`/api/detail/${currentUserData.likedDetails[0]}`).then(response => response.json()).then(data => details = data);
			fetch(`/api/detail/${currentUserData.likedDetails[0]}/external`).then(response => response.json()).then(data => externalDetails = data);
			fetch(`/api/detail/${currentUserData.likedDetails[0]}/external/content`).then(response => response.json()).then(data => externalContent = data);
		} else {
			fetch(`/api/detail/6397b22cafe8001db60437ef`).then(response => response.json()).then(data => details = data);
			fetch(`/api/detail/6397b22cafe8001db60437ef/external`).then(response => response.json()).then(data => externalDetails = data);
			fetch(`/api/detail/6397b22cafe8001db60437ef/external/content`).then(response => response.json()).then(data => externalContent = data);
		}
	}

	let likedByCurrentUser;
	let currentUserBookmarks;
	let bookmarkedByCurrentUser;
	$: if (details) {
		likedByCurrentUser = details.likes.includes(currentUserData?._id);
	}
	$: if (currentUserData) {
		currentUserBookmarks = currentUserData.bookmarks;
	}
	$: if (currentUserBookmarks) {
		bookmarkedByCurrentUser = currentUserBookmarks.includes(details?._id);
	}



	const addComment = (newComment: any) => {
		details.comments = [...details.comments, newComment];
	};

	const deleteComment = (newComment: any) => {
		details.comments = details.comments.filter((c) => c != newComment);
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
		if (!currentUserData) return;

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

<main>
	<div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
		<div class="col-md-12 px-0 center">
			<h1 class="display-4 fst-italic">Welcome to NewzLife!</h1>
			<p class="lead my-3">
				Find information on the latest news around the world, and share insights and conversations
				with your peers about them, all at the same time.
			</p>
		</div>
	</div>

	{#if featuredArticles}
		{#each featuredArticles as pairArticles}
			<div class="row mb-2">
				<div class="col-md-6">
					<div
						class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
					>
						<div class="col p-4 d-flex flex-column position-static">
							<strong class="d-inline-block mb-2 text-primary"
							>{['World', 'Popular', 'Breaking'].at(Math.random() * 3)}</strong
							>
							<h3 class="mb-0">{pairArticles[0].title}</h3>
							<div class="mb-1 text-muted">{pairArticles[0].publishedAt.split('T')[0]}</div>
							<p class="card-text mb-auto">
								{pairArticles[0].description}
							</p>
							<a on:click={createDetailAndRedirect(pairArticles[0].title, pairArticles[0].source.id)} href='' class="stretched-link"/>
						</div>
						<div class="col-auto d-none d-lg-block relative">
							<img src={pairArticles[0].urlToImage} class="vertical-center" />
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div
						class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
					>
						<div class="col p-4 d-flex flex-column position-static">
							<strong class="d-inline-block mb-2 text-primary"
							>{['World', 'Popular', 'Breaking'].at(Math.random() * 3)}</strong
							>
							<h3 class="mb-0">{pairArticles[1].title}</h3>
							<div class="mb-1 text-muted">{pairArticles[1].publishedAt.split('T')[0]}</div>
							<p class="mb-auto">
								{pairArticles[1].description}
							</p>
							<a on:click={createDetailAndRedirect(pairArticles[1].title, pairArticles[1].source.id)} href='' class="stretched-link"/>
						</div>
						<div class="col-auto d-none d-lg-block relative">
							<img src={pairArticles[1].urlToImage} class="vertical-center" />
						</div>
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<p>Loading...</p>
	{/if}

	{#if currentUserData && externalDetails}
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
						<p class='text-center'><strong>Comments: {details.comments.length}</strong></p>

						{#each details.comments as comment}
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
		<strong>Log in to see personalized content!</strong>
	{/if}
</main>

<style>

    .relative {
        position: relative;
    }

    .vertical-center {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    img {
        max-width: 200px;
        max-height: 500px;
        width: auto;
        height: auto;
        margin-right: 20px;
    }

    .flex-equal > * {
        flex: 1;
    }
    @media (min-width: 768px) {
        .flex-md-equal > * {
            flex: 1;
        }
    }

    .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: 'Playfair Display', Georgia, 'Times New Roman',
        serif /*rtl:Amiri, Georgia, "Times New Roman", serif*/;
    }

    .display-4 {
        font-size: 2.5rem;
    }
    @media (min-width: 768px) {
        .display-4 {
            font-size: 3rem;
        }
    }

    .nav-scroller {
        position: relative;
        z-index: 2;
        height: 2.75rem;
        overflow-y: hidden;
    }

    .nav-scroller .nav {
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 1rem;
        margin-top: -1px;
        overflow-x: auto;
        text-align: center;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
    }

    .nav-scroller .nav-link {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        font-size: 0.875rem;
    }

    @media (min-width: 768px) {
        .h-md-250 {
            height: 250px;
        }
    }

    /*
			 * Blog posts
			 */
    .blog-post {
        margin-bottom: 4rem;
    }
    .blog-post-title {
        margin-bottom: 0.25rem;
        font-size: 2.5rem;
    }
    .blog-post-meta {
        margin-bottom: 1.25rem;
        color: #727272;
    }

    .center {
        text-align: center;
    }
</style>
