<script lang="ts">
	import type { TaskType } from '$lib/types/task.type.js';

	export let task: TaskType;

	export let onComplete: (taskId: string) => void;
	export let onRemove: (taskId: string) => void;
</script>

<div
	class="w-full min-w-[300px] items-start rounded-2xl border-1 border-solid border-gray-500 bg-amber-200 p-5 shadow-xl"
>
	<div class="w-full">
		<div class="flex items-start justify-between">
			<h1 class="text-xl font-bold text-gray-600 text-wrap">{task.title}</h1>
			{#if task.completed}
				<i class="mb-5 rounded-2xl bg-green-500 px-4 py-1 text-xs text-black">Completed</i>
			{:else}
				<i class="mb-5 rounded-2xl bg-red-500 px-4 py-1 text-xs text-nowrap text-white">
					Not Completed
				</i>
			{/if}
		</div>
		<p class="text-md font-medium text-gray-500">{task.description}</p>
	</div>
	<div class="mx-auto mt-5 flex flex-col items-center justify-center gap-1">
		{#if task.completed}
			<button
				type="button"
				on:click={() => onRemove(task._id)}
				class="cursor-pointer rounded-2xl bg-red-500 px-4 py-1 text-sm text-white">Remove</button
			>
		{:else}
			<button
				type="button"
				on:click={() => onComplete(task._id)}
				class="cursor-pointer rounded-2xl bg-green-500 px-4 py-1 text-sm text-white"
			>
				Done
			</button>
		{/if}
	</div>
</div>
