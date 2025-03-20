<script lang="ts">
	import { goto, replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import Search from './Icons/Search.svelte';

	let timeout: number | undefined = undefined;
</script>

<form
	class="dark:bg-very-dark-blue relative top-[-28px] mx-auto w-[calc(100vw-48px)] max-w-[1110px] min-w-20 gap-4 rounded-[6px] bg-white p-[16px_16px_16px_24px] min-[768px]:w-[calc(100vw-80px)] min-[768px]:gap-7"
	onsubmit={(e) => e.preventDefault()}
	data-sveltekit-keepfocus
	data-sveltekit-replacestate
>
	<div class="flex items-center gap-4">
		<Search className="size-4 fill-violet flex-[0_0_16px]" />
		<input
			type="search"
			placeholder="Filtrar por labels"
			aria-label="Filtrar por labels"
			name="search"
			class="text-very-dark-blue box-border w-full appearance-none border-none bg-transparent font-[inherit] font-normal hover:border-none hover:bg-transparent hover:outline-none focus:border-none focus:bg-transparent focus:outline-none dark:text-white"
			value={page.url.searchParams.get('search') || ''}
			oninput={(e) => {
				const value = e.currentTarget.value;

				clearTimeout(timeout);

				timeout = setTimeout(() => {
					if (!value.trim()) {
						if (page.url.searchParams.has('search')) {
							goto(page.url.pathname, { replaceState: true, keepFocus: true });
						}
					} else {
						goto(`?search=${value}`, { replaceState: true, keepFocus: true });
					}
				}, 500);
			}}
		/>
	</div>
</form>
