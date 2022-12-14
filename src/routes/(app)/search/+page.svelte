<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let criteria = $page.url.searchParams.get('criteria');
	let searchResults;

	// remote API call -> store locally for display
	function search(givenCriteria) {
		const searchUrl = new URL($page.url);
		searchUrl.searchParams.set('criteria', givenCriteria);
		criteria = givenCriteria;
		goto(searchUrl);
	}

	// group article results by 3 for display
	function groupBy3(articles) {
		let groupedArticles = [];
		if (articles.length >= 3) {
			for (let ii = 0; ii + 2 < articles.length; ii = ii + 3) {
				groupedArticles.push([articles[ii], articles[ii + 1], articles[ii + 2]]);
			}
		} else {
			// 2 or fewer articles; make a single array with them
			let singleGroup = [];
			articles.forEach((article) => singleGroup.push(article));
			groupedArticles.push(singleGroup);
		}
		return groupedArticles;
	}

	// here, handle a search page w criteria (i.e. by hand or a search has been clicked)
	$: if (criteria) {
		let newsapiEndpoint = `https://newsapi.org/v2/everything?sortBy=relevancy&language=en&pageSize=60&q=${criteria}`;
		fetch(newsapiEndpoint, {
			method: 'GET',
			headers: {
				'X-API-KEY': '2128dfda75c54ed3b045b635f45604e9'
			}
		})
			.then((response) => response.json())
			.then((data) => (searchResults = groupBy3(data.articles)))
			.catch((error) => console.log(error));
	}

	// reset page if returning to /search
	$: if (!$page.url.searchParams.get('criteria')) {
		criteria = null;
	}

	// create a Detail object for the given article if one does not exist in the database, then redirect to details page
	async function createDetailAndRedirect(title, source) {
		const response = await fetch(`/api/search?title=${title}&source=${source}`);
		let responseValues = await response.json();
		goto(`/details/${responseValues}`);
	}
</script>

<section class="py-5 text-center container">
	<h1 class="fw-light">Search NewzLife</h1>
</section>

<div class="container">
	<br />
	<div class="row justify-content-center">
		<div class="col-12 col-md-10 col-lg-8">
			<form class="card card-sm">
				<div class="card-body row no-gutters align-items-center">
					<div class="col-auto">
						<i class="fa-solid fa-magnifying-glass text-body" />
					</div>
					<div class="col">
						<input
							class="form-control form-control-lg form-control-borderless"
							type="search"
							placeholder="Search topics or keywords"
							id="search-input"
						/>
					</div>
					<div class="col-auto">
						<button
							class="btn btn-lg btn-success"
							type="button"
							on:click={() => search(document.getElementById('search-input').value)}>Search</button
						>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

{#if criteria && searchResults}
	<br />
	{#if searchResults.length === 0}
		<h2>Looks like your search didn't come up with anything...</h2>
	{:else if searchResults.length === 1 && searchResults[0].length < 3}
		{#if searchResults[0].length === 1}
			<div class="container">
				<div class="row row-cols-1 g-3">
					<div class="col">
						<div class="card shadow-sm">
							<img src={searchResults[0][0].urlToImage} alt="" />
							<div class="card-body">
								<strong>{searchResults[0][0].title}</strong>
								<div class="d-flex justify-content-between align-items-center">
									<a
										href=''
										on:click={createDetailAndRedirect(
											searchResults[0][0].title,
											searchResults[0][0].source.id
										)}
										class="stretched-link"
									/>
									<p>{searchResults[0][0].description}</p>
									<small class="text-muted">{searchResults[0][0].publishedAt.split('T')[0]}</small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="container">
				<div class="row row-cols-1 row-cols-sm-2 g-3">
					<div class="col">
						<div class="card shadow-sm">
							<img src={searchResults[0][0].urlToImage} alt="" />
							<div class="card-body">
								<strong>{searchResults[0][0].title}</strong>
								<div class="d-flex justify-content-between align-items-center">
									<a
										href=''
										on:click={createDetailAndRedirect(
											searchResults[0][0].title,
											searchResults[0][0].source.id
										)}
										class="stretched-link"
									/>
									<p>{searchResults[0][0].description}</p>
									<small class="text-muted">{searchResults[0][0].publishedAt.split('T')[0]}</small>
								</div>
							</div>
						</div>
					</div>
					<div class="col">
						<div class="card shadow-sm">
							<img src={searchResults[0][1].urlToImage} alt="" />
							<div class="card-body">
								<strong>{searchResults[0][1].title}</strong>
								<div class="d-flex justify-content-between align-items-center">
									<a
										href=''
										on:click={createDetailAndRedirect(
											searchResults[0][1].title,
											searchResults[0][1].source.id
										)}
										class="stretched-link"
									/>
									<p>{searchResults[0][1].description}</p>
									<small class="text-muted">{searchResults[0][1].publishedAt.split('T')[0]}</small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	{:else}
		{#each searchResults as articleTrio}
			<div class="album py-5 bg-light">
				<div class="container">
					<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
						<div class="col">
							<div class="card shadow-sm">
								<img src={articleTrio[0].urlToImage} alt="" />
								<div class="card-body">
									<strong>{articleTrio[0].title}</strong>
									<div class="d-flex justify-content-between align-items-center">
										<a
											href=''
											on:click={createDetailAndRedirect(
												articleTrio[0].title,
												articleTrio[0].source.id
											)}
											class="stretched-link"
										/>
										<p>{articleTrio[0].description}</p>
										<small class="text-muted">{articleTrio[0].publishedAt.split('T')[0]}</small>
									</div>
								</div>
							</div>
						</div>
						<div class="col">
							<div class="card shadow-sm">
								<img src={articleTrio[1].urlToImage} alt="" />
								<div class="card-body">
									<strong>{articleTrio[1].title}</strong>
									<div class="d-flex justify-content-between align-items-center">
										<a
											href=''
											on:click={createDetailAndRedirect(
												articleTrio[1].title,
												articleTrio[1].source.id
											)}
											class="stretched-link"
										/>
										<p>{articleTrio[1].description}</p>
										<small class="text-muted">{articleTrio[1].publishedAt.split('T')[0]}</small>
									</div>
								</div>
							</div>
						</div>
						<div class="col">
							<div class="card shadow-sm">
								<img src={articleTrio[2].urlToImage} alt="" />
								<div class="card-body">
									<strong>{articleTrio[2].title}</strong>
									<div class="d-flex justify-content-between align-items-center">
										<a
											href=''
											on:click={createDetailAndRedirect(
												articleTrio[2].title,
												articleTrio[2].source.id
											)}
											class="stretched-link"
										/>
										<p>{articleTrio[2].description}</p>
										<small class="text-muted">{articleTrio[2].publishedAt.split('T')[0]}</small>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	{/if}
{:else}{/if}

<style>
</style>
