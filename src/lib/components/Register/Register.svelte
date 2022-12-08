<script lang="ts">
	import { enhance } from '$app/forms';
	import { useForm, Hint, validators, minLength } from 'svelte-use-form';

	const form = useForm();
</script>

<div>
	<h1>Register</h1>
	<form method="POST" use:form use:enhance action="/register">
		<div class="form-group">
			<input
				class="form-control"
				name="username"
				type="text"
				placeholder="Username"
				use:validators={[minLength(5)]}
			/>
			<Hint for="username" on="minLength" let:value>
				Password requires at least {value} characters.
			</Hint>
		</div>

		<div class="form-group">
			<input
				class="form-control"
				name="password"
				type="password"
				placeholder="Password"
				use:validators={[minLength(5)]}
			/>
			<Hint for="password" on="minLength" let:value>
				Password requires at least {value} characters.
			</Hint>

			<input
				class="form-control"
				name="verifyPassword"
				type="password"
				placeholder="Verify Password"
			/>
		</div>

		<button class="btn btn-primary" disabled={!$form.valid} type="submit">Register</button>
	</form>
</div>
