<script lang="ts">
	import { page } from '$app/state';
	import TriangleExclamation from '$lib/Icons/TriangleExclamation.svelte';

	let { timestamp }: { timestamp: number } = $props();

	function calculateTimeLeft() {
		const now = Math.floor(Date.now() / 1000);
		const remainingTime = timestamp - now;

		if (remainingTime <= 0) {
			return { hours: 0, minutes: 0, seconds: 0, expired: true };
		}

		return {
			hours: Math.floor(remainingTime / 3600),
			minutes: Math.floor((remainingTime % 3600) / 60),
			seconds: remainingTime % 60,
			expired: false
		};
	}

	let timeLeft = $state(calculateTimeLeft());

	$effect(() => {
		const timer = setInterval(() => {
			timeLeft = calculateTimeLeft();
		}, 1000);

		return () => clearInterval(timer);
	});
</script>

<div
	class="mx-auto flex h-[calc(100vh-376px)] max-w-[730px] items-center justify-center px-6 min-[450px]:h-[calc(100vh-406px)]"
>
	{#if timeLeft.expired}
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
			<p class="text-violet text-center text-[14px] leading-[18px] font-medium">
				O tempo já passou, recarregue a página para visualizar as vagas.
			</p>
		</div>
	{:else}
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
			<p class="text-violet text-center text-[14px] leading-[18px] font-medium">
				Tempo restante: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
			</p>
		</div>
	{/if}
</div>
