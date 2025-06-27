<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { z } from 'zod';

	export let open = false;
	export let closeOnClickOutside = true;
	export let closeOnEsc = true;
	export let onClose: () => void;
	export let onCreate: (data: { title: string; description: string }) => void;

	let formData = {
		title: '',
		description: ''
	};

	let error: {
		title: string;
		description: string;
	} = {
		title: '',
		description: ''
	};

	const schema = z.object({
		title: z.string().min(1, 'Title is required'),
		description: z.string().min(1, 'Description is required')
	});

	function handleSubmit(event: Event) {
		event.preventDefault();

		const result = schema.safeParse(formData);

		if (!result.success) {
			const issues = result.error.issues;
			error.title = issues.find((issue) => issue.path.includes('title'))?.message || '';
			error.description = issues.find((issue) => issue.path.includes('description'))?.message || '';
			return;
		}
		error.title = '';
		error.description = '';
		onCreate?.(result.data);
		formData = { title: '', description: '' };
	}

	function close() {
		open = false;
		formData = { title: '', description: '' };
		error = { title: '', description: '' };
		onClose?.();
	}

	// @ts-ignore
	function handleKeydown(e) {
		if (closeOnEsc && e.key === 'Escape' && open) {
			close();
		}
	}

	// @ts-ignore
	function handleOutsideClick(e) {
		if (closeOnClickOutside && e.target === e.currentTarget && open) {
			close();
		}
	}

	// @ts-ignore
	function handleModalKeydown(e) {
		if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) {
			handleOutsideClick(e);
		}
	}
</script>

{#if open}
	<div
		class="modal-backdrop"
		on:click={handleOutsideClick}
		on:keydown={handleModalKeydown}
		role="dialog"
		aria-modal="true"
		tabindex="0"
		transition:fade={{ duration: 200 }}
	>
		<div class="modal-content" transition:scale={{ start: 0.95, duration: 200 }}>
			<button class="close-button" on:click={close}>×</button>
			<div class="modal-body mt-10">
				<p class="mb-5 text-center text-lg font-medium text-amber-500">Create new task</p>
				<form on:submit={handleSubmit} class="flex flex-col space-y-4">
					<div>
						<input
							type="text"
							bind:value={formData.title}
							placeholder="Title"
							class="w-full rounded-lg border border-gray-400 p-2 focus:outline-0"
						/>
						<p class="text-sm text-red-500">{error.title}</p>
					</div>
					<div>
						<input
							type="text"
							bind:value={formData.description}
							placeholder="Description"
							class="w-full rounded-lg border border-gray-400 p-2 focus:outline-0"
						/>
						<p class="text-sm text-red-500">{error.description}</p>
					</div>
					<button type="submit" class="cursor-pointer rounded-2xl bg-blue-500 px-4 py-2 text-white"
						>Submit</button
					>
				</form>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal-content {
		background-color: white;
		border-radius: 4px;
		padding: 20px;
		width: 100%;
		max-width: 50%;
		max-height: 90%;
		overflow: auto;
		position: relative;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.close-button {
		position: absolute;
		top: 10px;
		right: 10px;
		background: none;
		border: none;
		font-size: 24px;
		cursor: pointer;
		color: #666;
	}

	.close-button:hover {
		color: #000;
	}
</style>
