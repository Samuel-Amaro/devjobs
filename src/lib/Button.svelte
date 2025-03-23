<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		variant: 'primary' | 'secondary';
	}

	let { children, variant, ...rest }: Props = $props();
</script>

<button
	{...rest}
	class={[
		'box-border flex h-[36px] w-full appearance-none items-center justify-center rounded-[5px] border-none text-base font-bold outline-none',
		variant === 'primary' && 'bg-violet hover:bg-light-violet focus:bg-light-violet text-white',
		variant === 'secondary' &&
			'bg-custom-1 dark:bg-custom-2 text-violet hover:bg-custom-3 focus:bg-custom-3 dark:hover:bg-custom-4 focus:hover:bg-custom-4 mix-blend-multiply dark:text-white',
		rest.class
	]}
>
	{@render children?.()}
</button>
