<script src="../assets/dist/js/bootstrap.bundle.min.js">
	// can also define functions here to be used for events (user clicks on something to take them to something)
	import { onMount } from 'svelte';

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
				'X-API-KEY': '2128dfda75c54ed3b045b635f45604e9'
			}
		})
			.then((response) => response.json())
			.then((data) => (featuredArticles = group(data.articles.slice(0, 6))))
			.catch((error) => console.log(error));
	});
</script>

<main>
	<div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
		<div class="col-md-12 px-0 center">
			<h1 class="display-4 fst-italic">Welcome to Newzlife!</h1>
			<p class="lead my-3">
				Find information on the latest news around the world, and share insights and conversations
				with your peers about them, all at the same time.
			</p>
			<p class="lead mb-0"><a href="#" class="text-white fw-bold">Continue reading...</a></p>
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
							<a href={pairArticles[0].url} class="stretched-link" target="_blank" />
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
							<a href={pairArticles[1].url} class="stretched-link" target="_blank" />
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

	{#if true}
		<div class="row g-5">
			<div class="col-md-8">
				<h3 class="pb-4 mb-4 fst-italic border-bottom">From your recent Activity</h3>

				<article class="blog-post">
					<h2 class="blog-post-title">
						Latest blog post commented on/liked by user (or something they're interested in if no
						comments/likes)
					</h2>
					<p class="blog-post-meta">January 1, 2021 by <a href="#">Mark</a></p>

					<p>
						This blog post shows a few different types of content that’s supported and styled with
						Bootstrap. Basic typography, lists, tables, images, code, and more are all supported as
						expected.
					</p>
					<hr />
					<p>
						This is some additional paragraph placeholder content. It has been written to fill the
						available space and show how a longer snippet of text affects the surrounding content.
						We'll repeat it often to keep the demonstration flowing, so be on the lookout for this
						exact same string of text.
					</p>
					<h2>Blockquotes</h2>
					<p>This is an example blockquote in action:</p>
					<blockquote class="blockquote">
						<p>Quoted text goes here.</p>
					</blockquote>
					<p>
						This is some additional paragraph placeholder content. It has been written to fill the
						available space and show how a longer snippet of text affects the surrounding content.
						We'll repeat it often to keep the demonstration flowing, so be on the lookout for this
						exact same string of text.
					</p>
					<h3>Example lists</h3>
					<p>
						This is some additional paragraph placeholder content. It's a slightly shorter version
						of the other highly repetitive body text used throughout. This is an example unordered
						list:
					</p>
					<ul>
						<li>First list item</li>
						<li>Second list item with a longer description</li>
						<li>Third list item to close it out</li>
					</ul>
					<p>And this is an ordered list:</p>
					<ol>
						<li>First list item</li>
						<li>Second list item with a longer description</li>
						<li>Third list item to close it out</li>
					</ol>
					<p>And this is a definiton list:</p>
					<dl>
						<dt>HyperText Markup Language (HTML)</dt>
						<dd>The language used to describe and define the content of a Web page</dd>
						<dt>Cascading Style Sheets (CSS)</dt>
						<dd>Used to describe the appearance of Web content</dd>
						<dt>JavaScript (JS)</dt>
						<dd>The programming language used to build advanced Web sites and applications</dd>
					</dl>
					<h3>Sub-heading</h3>
					<p>
						This is some additional paragraph placeholder content. It has been written to fill the
						available space and show how a longer snippet of text affects the surrounding content.
						We'll repeat it often to keep the demonstration flowing, so be on the lookout for this
						exact same string of text.
					</p>
					<pre><code>Example code block</code></pre>
					<p>
						This is some additional paragraph placeholder content. It's a slightly shorter version
						of the other highly repetitive body text used throughout.
					</p>
				</article>
			</div>

			<div class="col-md-4">
				<div class="position-sticky" style="top: 2rem;">
					<div class="p-4 mb-3 bg-light rounded">
						<h4 class="fst-italic">About</h4>
						<p class="mb-0">
							Check out this news article that we noticed you were interested in, or might be
							interested in.
							<br />
							<br />
							And find more such articles below!
						</p>
					</div>

					<div class="p-4">
						<h4 class="fst-italic">Recently Liked</h4>
						<ol class="list-unstyled mb-0">
							<li><a href="#">March 2021</a></li>
							<li><a href="#">February 2021</a></li>
							<li><a href="#">January 2021</a></li>
							<li><a href="#">December 2020</a></li>
							<li><a href="#">November 2020</a></li>
							<li><a href="#">October 2020</a></li>
							<li><a href="#">September 2020</a></li>
							<li><a href="#">August 2020</a></li>
							<li><a href="#">July 2020</a></li>
							<li><a href="#">June 2020</a></li>
							<li><a href="#">May 2020</a></li>
							<li><a href="#">April 2020</a></li>
						</ol>
					</div>

					<div class="p-4">
						<h4 class="fst-italic">Recently Commented</h4>
						<ol class="list-unstyled">
							<li><a href="#">GitHub</a></li>
							<li><a href="#">Twitter</a></li>
							<li><a href="#">Facebook</a></li>
						</ol>
					</div>
				</div>
			</div>
		</div>
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
