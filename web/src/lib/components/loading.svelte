<script>
	export let size = '2rem';
	export let color = '#333';
	export let message = 'Loading...';
	export let showMessage = true;
	export let fullscreen = false;
</script>

<div class="loading-container" class:fullscreen aria-live="polite" role="status">
	<div
		class="spinner"
		style="width: {size}; height: {size}; border-color: {color} transparent {color} transparent;"
	></div>

	{#if showMessage}
		<p class="message" style="color: {color};">{message}</p>
	{/if}

	<span class="sr-only">{message}</span>
</div>

<style>
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.fullscreen {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(255, 255, 255, 0.8);
		z-index: 9999;
	}

	.spinner {
		border: 0.25rem solid;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.message {
		margin-top: 0.75rem;
		font-size: 1rem;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
