<article
	class="dark:bg-very-dark-blue relative flex min-h-[228px] w-full max-w-[350px] flex-col justify-between overflow-hidden rounded-[6px] bg-white p-8"
>
	<header class="flex flex-col gap-3">
		<div class="text-dark-gray flex items-center gap-3 text-base font-normal">
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<div
				class="animate-shimer h-[24px] w-[50px] rounded-[4px] bg-linear-[90deg,#e0e0e0_25%,#f0f0f0_50%,#e0e0e0_75%] bg-[200%_100%]"
			/>
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<span class="bg-dark-gray block size-1 rounded-[50%]" />
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<div
				class="animate-shimer h-[24px] w-[50px] rounded-[4px] bg-linear-[90deg,#e0e0e0_25%,#f0f0f0_50%,#e0e0e0_75%] bg-[200%_100%]"
			/>
		</div>
		<!-- svelte-ignore element_invalid_self_closing_tag -->
		<div
			class="animate-shimer h-[24px] w-full rounded-[4px] bg-linear-[90deg,#e0e0e0_25%,#f0f0f0_50%,#e0e0e0_75%] bg-[200%_100%]"
		/>
	</header>
	<ul class="m-0 flex list-none items-center gap-2.5 p-0">
		{#each { length: 3 }}
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<li
				class="animate-shimer h-5 w-[60px] rounded-[4px] bg-linear-[90deg,#e0e0e0_25%,#f0f0f0_50%,#e0e0e0_75%] bg-[200%_100%]"
			/>
		{/each}
	</ul>
</article>
