<script lang="ts">
	import { page } from '$app/state';
	import ErrorTimeLeft from '$lib/ErrorTimeLeft.svelte';
	import TriangleExclamation from '$lib/Icons/TriangleExclamation.svelte';
</script>

{#if page?.error?.awaitTimestampReset}
	<ErrorTimeLeft timestamp={page?.error?.awaitTimestampReset} />
{:else}
	<div
		class="mx-auto flex h-[calc(100vh-376px)] max-w-[730px] items-center justify-center px-6 min-[450px]:h-[calc(100vh-406px)]"
	>
		<div class="flex flex-col items-center gap-3">
			<TriangleExclamation className="size-[80px] fill-violet" />
			<h1
				class="text-very-dark-blue text-center text-[20px] leading-[24px] font-semibold dark:text-white"
			>
				{page?.error?.title || 'Ops... Um erro inesperado ocorreu'}
			</h1>
			<p class="text-dark-gray dark:text-gray text-center text-[16px] leading-[26px] font-normal">
				{page?.error?.message}
			</p>
		</div>
	</div>
{/if}
