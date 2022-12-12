<script src="../assets/dist/js/bootstrap.bundle.min.js">
	// can also define functions here to be used for events (user clicks on something to take them to something)
	import { onMount } from 'svelte';

	function group(articles) {
		return [
			[articles[0], articles[1]],
			[articles[2], articles[3]],
			[articles[4], articles[5]],
			[articles[6], articles[7]]
		];
	}

	let featuredArticles;
	onMount(async () => {
		// change endpoint depending on whether used is logged in or not and depending on their preferences?
		let newsapiEndpoint = 'https://newsapi.org/v2/top-headlines?sortBy=popularity&language=en';
		const response = await fetch(newsapiEndpoint, {
			method: 'GET',
			headers: {
				'X-API-KEY': '2128dfda75c54ed3b045b635f45604e9'
			}
		})
			.then((response) => response.json())
			.then((data) => (featuredArticles = group(data.articles.slice(0, 8))))
			.catch((error) => console.log(error));
	});
</script>

<main>
	<div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
		<div class="col-md-5 p-lg-5 mx-auto my-5">
			<h1 class="display-4 fw-normal">Welcome to Newzlife!</h1>
			<p class="lead fw-normal">
				Find information on the latest news around the world, and share insights and conversations
				with your peers about them, all at the same time.
			</p>
			<a class="btn btn-outline-secondary" href="#">Coming soon</a>
		</div>
		<div class="product-device shadow-sm d-none d-md-block" />
		<div class="product-device product-device-2 shadow-sm d-none d-md-block" />
	</div>

	{#if featuredArticles}
		{#each featuredArticles as pairArticles}
			<div class="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
				<div class="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
					<div class="my-3 p-3">
						<a href={pairArticles[0].url} target="_blank">
							<h2 class="font-weight-bold title-font">{pairArticles[0].title}</h2>
						</a>
						<p class="lead">{pairArticles[0].description}</p>
					</div>
					<img src={pairArticles[0].urlToImage} />
				</div>
				<div
					class="bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden"
				>
					<div class="my-3 py-3">
						<a href={pairArticles[1].url} target="_blank">
							<h2 class="font-weight-bold title-font">{pairArticles[1].title}</h2>
						</a>
						<p class="lead">{pairArticles[1].description}</p>
					</div>
					<img src={pairArticles[1].urlToImage} />
				</div>
			</div>
		{/each}
	{:else}
		<p>Loading...</p>
	{/if}
</main>

<style>
	.site-header a {
		color: #8e8e8e;
		transition: color 0.15s ease-in-out;
	}

	.site-header a:hover {
		color: #fff;
		text-decoration: none;
	}

	.title-font {
		font-size: 2.5em;
	}

	/*
		 * Dummy devices (replace them with your own or something else entirely!)
		 */

	.product-device {
		position: absolute;
		right: 10%;
		bottom: -30%;
		width: 300px;
		height: 540px;
		background-color: #333;
		border-radius: 21px;
		transform: rotate(30deg);
	}

	.product-device::before {
		position: absolute;
		top: 10%;
		right: 10px;
		bottom: 10%;
		left: 10px;
		content: '';
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 5px;
	}

	.product-device-2 {
		top: -25%;
		right: auto;
		bottom: 0;
		left: 5%;
		background-color: #e5e5e5;
	}

	/*
		 * Extra utilities
		 */

	.flex-equal > * {
		flex: 1;
	}
	@media (min-width: 768px) {
		.flex-md-equal > * {
			flex: 1;
		}
	}
</style>
