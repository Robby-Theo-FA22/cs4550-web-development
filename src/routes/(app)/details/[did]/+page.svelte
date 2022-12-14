<script lang='ts'>
	import { page } from '$app/stores';

	$: externalDetails = $page.data.externalDetails;
	$: externalContent = $page.data.externalContent;
</script>

{#if externalDetails}
	<div>
		<section id='intro' class='p-4 text-center bg-light'>
			<h1 class='mb-0 h4'>{externalDetails.title}</h1>
		</section>

		<!--Section: Post data-mdb-->
		<section class='border-bottom text-center mb-4'>
			<img src={externalDetails.urlToImage} class='img-fluid shadow-2-strong rounded-5 mb-4' alt='' />

			<div class='row align-items-center mb-4'>
				<div class='col-lg-6 text-center text-lg-start mb-3 m-lg-0'>
							<span> Published {externalDetails.publishedAt.split('T')[0]}
								by {externalDetails.author ?? 'Unknown Author'}</span>
				</div>
			</div>
		</section>
		<!--Section: Post data-mdb-->

		<!--Section: Text-->
		<section>
			<p>{externalContent ?? 'No content...'}</p>

			<!--Section: Author-->
			<section class='border-bottom mb-4 pb-4'>
				<div class='row'>
					<div class='col-3'>
						<img
							src='https://mdbootstrap.com/img/Photos/Avatars/img%20(23).jpg'
							class='img-fluid shadow-1-strong rounded-5'
							alt=''
						/>
					</div>

					<div class='col-9'>
						<p class='mb-2'><strong>Anna Maria Doe</strong></p>
						<a href='' class='text-dark'><i class='fab fa-facebook-f me-1' /></a>
						<a href='' class='text-dark'><i class='fab fa-twitter me-1' /></a>
						<a href='' class='text-dark'><i class='fab fa-linkedin me-1' /></a>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio est ab iure
							inventore dolorum consectetur? Molestiae aperiam atque quasi consequatur aut?
							Repellendus alias dolor ad nam, soluta distinctio quis accusantium!
						</p>
					</div>
				</div>
			</section>
			<!--Section: Author-->

			<!--Section: Comments-->
			<section class='border-bottom mb-3'>
				<p class='text-center'><strong>Comments: 3</strong></p>

				<!-- Comment -->
				<div class='row mb-4 border rounded p-3'>
					<div class='col-2'>
						<img
							src='https://mdbootstrap.com/img/Photos/Avatars/img%20(24).jpg'
							class='img-fluid shadow-1-strong rounded-5'
							alt=''
						/>
					</div>

					<div class='col-10'>
						<p class='mb-2'><strong>Marta Dolores</strong></p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio est ab iure
							inventore dolorum consectetur? Molestiae aperiam atque quasi consequatur aut?
							Repellendus alias dolor ad nam, soluta distinctio quis accusantium!
						</p>
					</div>
				</div>

				<!-- Comment -->
				<div class='row mb-4'>
					<div class='col-2'>
						<img
							src='https://mdbootstrap.com/img/Photos/Avatars/img%20(25).jpg'
							class='img-fluid shadow-1-strong rounded-5'
							alt=''
						/>
					</div>

					<div class='col-10'>
						<p class='mb-2'><strong>Valeria Groove</strong></p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio est ab iure
							inventore dolorum consectetur? Molestiae aperiam atque quasi consequatur aut?
							Repellendus alias dolor ad nam, soluta distinctio quis accusantium!
						</p>
					</div>
				</div>

				<!-- Comment -->
				<div class='row mb-4'>
					<div class='col-2'>
						<img
							src='https://mdbootstrap.com/img/Photos/Avatars/img%20(26).jpg'
							class='img-fluid shadow-1-strong rounded-5'
							alt=''
						/>
					</div>

					<div class='col-10'>
						<p class='mb-2'><strong>Antonia Velez</strong></p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio est ab iure
							inventore dolorum consectetur? Molestiae aperiam atque quasi consequatur aut?
							Repellendus alias dolor ad nam, soluta distinctio quis accusantium!
						</p>
					</div>
				</div>
			</section>
			<!--Section: Comments-->

			<!--Section: Reply-->
			<section>
				<p class='text-center'><strong>Leave a reply</strong></p>

				<form>
					<!-- Message input -->
					<div class='form-outline mb-4'>
						<textarea class='form-control' id='form4Example3' rows='4' />
						<label class='form-label' for='form4Example3' />
					</div>

					<!-- Submit button -->
					<button type='submit' class='btn btn-primary btn-block mb-4'> Publish</button>
				</form>
			</section>
			<!--Section: Reply-->
		</section>
	</div>
{:else}
	<h1>This doesn't exist...</h1>
{/if}
