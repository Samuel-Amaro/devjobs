<script lang="ts">
	import type { TypeTheme } from '../types';
	import Moon from './Icons/Moon.svelte';
	import Spinner from './Icons/Spinner.svelte';
	import Sun from './Icons/Sun.svelte';
	import { loadingTheme, theme } from './theme.svelte';

	function handleEvents(
		event:
			| (MouseEvent & {
					currentTarget: EventTarget & HTMLDivElement;
			  })
			| (KeyboardEvent & {
					currentTarget: EventTarget & HTMLDivElement;
			  })
	) {
		let state = '';
		if (event.currentTarget.getAttribute('aria-checked') === 'true') {
			state = 'false';
		} else {
			state = 'true';
		}
		event.currentTarget.setAttribute('aria-checked', state);
		theme.option = state === 'true' ? 'dark' : 'light';
		localStorage.setItem('themeOption', state === 'true' ? 'dark' : 'light');
		document.body.setAttribute('data-theme', state === 'true' ? 'dark' : 'light');
	}

	function getOption(option: TypeTheme | undefined) {
		if (!option) return 'false';

		return option === 'dark' ? 'true' : 'false';
	}
</script>

{#if loadingTheme.isLoading}
	<Spinner className="animate-spin size-5 fill-white" />
{:else}
	<div class="flex flex-wrap items-center gap-4">
		<Sun className="size-5 fill-white" />
		<div
			class="group h-6 w-12 rounded-[12px] bg-white p-[5px] outline-none"
			role="switch"
			aria-checked={getOption(theme.option)}
			aria-label="Alternar tema de cores"
			title="Alternar tema de cores"
			onclick={handleEvents}
			onkeydown={(event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					handleEvents(event);
				}
			}}
			tabindex="0"
		>
			<span
				class="bg-violet hover:bg-light-violet focus:bg-light-violet group-hover:bg-light-violet group-focus:bg-light-violet relative block size-3.5 rounded-[50%] group-aria-[checked=false]:left-0 group-aria-[checked=true]:left-[24px]"
			></span>
		</div>
		<Moon className="size-5 fill-white" />
	</div>
{/if}
