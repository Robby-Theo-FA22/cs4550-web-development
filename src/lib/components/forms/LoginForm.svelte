<script lang="ts">
	import { enhance } from '$app/forms';
	import { useForm, Hint, validators, required } from 'svelte-use-form';

	const form = useForm();

	const requiredMessage = 'This field is required.';
</script>

<div>
	<h1>Login</h1>
	<form method="POST" use:form use:enhance action="/api/login">
		<div class="form-group">
			<label for="username">Username</label>
			<input
				class="form-control"
				id="username"
				name="username"
				type="text"
				use:validators={[required]}
			/>
			<Hint for="username" on="required">{requiredMessage}</Hint>
			<br />

			<label for="password">Password</label>
			<input
				class="form-control"
				id="password"
				name="password"
				type="password"
				use:validators={[required]}
			/>
			<Hint for="username" on="required">{requiredMessage}</Hint>
			<br />
		</div>

		<div class="text-center">
			<button class="btn btn-primary " disabled={!$form.valid} type="submit">Login</button>
		</div>
	</form>
</div>

<style lang="scss">
	:global(.touched:invalid) {
		border-color: red;
		outline-color: red;
	}
</style>
