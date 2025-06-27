<script lang="ts">
	import { onMount } from 'svelte';
	import type { CreateTaskDto, TaskType } from '$lib/types/task.type.js';
	import Task from '$lib/components/task.svelte';
	import ModalCreateTask from '$lib/components/modal-create-task.svelte';
	import Loading from '$lib/components/loading.svelte';
	import LoadingOverlay from '$lib/components/loading-overlay.svelte';

	let data: TaskType[] = [];
	let isOpenModal: boolean = false;
	let loading: boolean = false;
	let loadingMutation: boolean = false;

	const handleGetTask = async () => {
		loading = true;
		const res = await fetch(import.meta.env.VITE_API_URL + '/task', { method: 'GET' });
		if (res.ok) {
			const result = await res.json();
			data = result;
		} else {
			console.error('Failed to fetch tasks');
		}
		loading = false;
	};

	const handleCreateTask = async (body: CreateTaskDto) => {
		loadingMutation = true;
		const res = await fetch(import.meta.env.VITE_API_URL + '/task', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
		if (res.ok) {
			await handleGetTask();
			isOpenModal = false;
		} else {
			console.error('Failed to create task');
		}
		loadingMutation = false;
	};

	const handleCompleteTask = async (taskId: string) => {
		loadingMutation = true;
		const res = await fetch(import.meta.env.VITE_API_URL + `/task/${taskId}/complete`, {
			method: 'PUT'
		});
		if (res.ok) {
			await handleGetTask();
		} else {
			console.error('Failed to complete task');
		}
		loadingMutation = false;
	};

	const handleRemoveTask = async (taskId: string) => {
		loadingMutation = true;
		const res = await fetch(import.meta.env.VITE_API_URL + `/task/${taskId}`, {
			method: 'DELETE'
		});
		if (res.ok) {
			await handleGetTask();
		} else {
			console.error('Failed to remove task');
		}
		loadingMutation = false;
	};

	onMount(() => {
		handleGetTask();
	});
</script>

<LoadingOverlay visible={loadingMutation} />
<ModalCreateTask
	open={isOpenModal}
	onClose={() => (isOpenModal = false)}
	onCreate={handleCreateTask}
/>
<div class="mx-auto mt-10 flex w-1/2 justify-between gap-20 px-5">
	<div class="h-fit max-h-[800px] min-w-[340px] overflow-y-auto rounded-lg bg-gray-300 p-5">
		<p class="text-xl font-bold">
			Todo <button
				type="button"
				on:click={() => (isOpenModal = true)}
				class="ml-5 cursor-pointer rounded-2xl bg-green-500 p-2 text-sm">Create</button
			>
		</p>
		{#if loading}
			<Loading />
		{:else if data.filter((t) => !t.completed).length > 0}
			<ul class="mt-5 flex flex-col gap-5">
				{#each data.filter((t) => !t.completed) as task}
					<Task {task} onComplete={(id) => handleCompleteTask(id)} onRemove={handleRemoveTask} />
				{/each}
			</ul>
		{:else}
			<p class="mt-5 text-gray-500">No tasks available.</p>
		{/if}
	</div>
	<div class="h-fit max-h-[800px] min-w-[340px] overflow-y-auto rounded-lg bg-gray-300 p-5">
		<p class="text-xl font-bold">Done</p>
		{#if loading}
			<Loading />
		{/if}

		{#if !loading}
			{#if data.filter((t) => t.completed).length === 0}
				<p class="mt-5 text-gray-500">No tasks completed yet.</p>
			{/if}
			{#if data.filter((t) => t.completed).length > 0}
				<ul class="mt-5 flex flex-col gap-5">
					{#each data.filter((t) => t.completed) as task}
						<Task {task} onComplete={(id) => handleCompleteTask(id)} onRemove={handleRemoveTask} />
					{/each}
				</ul>
			{/if}
		{/if}
	</div>
</div>
