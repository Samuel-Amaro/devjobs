<script lang="ts">
	import Logo from '$lib/Icons/Logo.svelte';
	import Switch from '$lib/Switch.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<header
	class="bg bg-[url(/bg-pattern-header.svg)] bg-cover bg-left-bottom bg-no-repeat p-[32px_24px_72px_24px] min-[400px]:bg-[url(/bg-pattern-header-tablet.svg)] min-[450px]:p-[42px_40px_86px_40px] min-[768px]:bg-[url(/bg-pattern-header-desktop.svg)] min-[768px]:p-[44px_40px_84px_40px]"
>
	<div class="mx-auto flex max-w-[1110px] flex-wrap items-center justify-between gap-4">
		<Logo />
		<Switch />
	</div>
</header>

{@render children()}
