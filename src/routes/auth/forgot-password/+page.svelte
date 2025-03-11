<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();

	let loading = $state(false);
</script>

<div>
	<h2 class="mt-8 text-center text-2xl font-bold md:mt-12 lg:mt-16">Forget Password</h2>
	<form
		method="POST"
		action="?/forgotPassword"
		class="mt-6 md:mt-10"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				await update();
				loading = false;
			};
		}}
	>
		<fieldset class="fieldset">
			<label class="input {form?.error === '' ? '' : ''} w-full focus:outline-0">
				<span class="icon-[ri--at-line] text-base-content size-5"></span>
				<input class="grow focus:outline-0" placeholder="Email Address" name="email" type="email" />
			</label>
		</fieldset>

		{#if form?.success === true}
			<div role="alert" class="alert alert-success alert-soft !px-3 !py-1">
				<span>{form.message}</span>
			</div>
		{/if}
		{#if form?.error}
			<div role="alert" class="alert alert-error alert-soft !px-3 !py-1">
				<span>
					{form.error}
				</span>
			</div>
		{/if}
		<button
			class="btn btn-neutral btn-wide disabled:text-neutral mt-4 max-w-full gap-3 md:mt-6"
			type="submit"
			disabled={loading}
		>
			<span
				class="{loading === true
					? 'icon-[ri--loader-3-line] animate-spin'
					: 'icon-[ri--send-plane-line]'} size-5"
			></span>{loading === true ? 'Sending...' : 'Send Reset Link'}</button
		>
		<a href="/auth/login" class="btn btn-wide text-neutral mt-4 max-w-full gap-3 md:mt-6">
			<span class="icon-[ri--login-circle-line] size-5"></span>Login</a
		>
	</form>
</div>
