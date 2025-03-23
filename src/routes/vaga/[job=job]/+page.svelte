<script lang="ts">
	import { page } from '$app/state';
	import Comment from '$lib/Icons/Comment.svelte';
	import TriangleExclamation from '$lib/Icons/TriangleExclamation.svelte';
	import { timeAgo } from '$lib/utils';
	import { marked } from 'marked';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

{#await data.job}
	<!-- TODO: ARRUMAR AQUI -->
	<p>Carregando dados da vaga...</p>
{:then job}
	<div class="mx-auto max-w-[730px] p-[0_24px_24px_24px]">
		<header
			class="dark:bg-very-dark-blue relative top-[-15px] flex flex-col items-center justify-center gap-14 rounded-[6px] bg-white p-[24px_32px_32px_32px]"
		>
			<h1 class="text-very-dark-blue text-[20px] font-bold dark:text-white">{job.title}</h1>
			<a
				href={job.html_url}
				target="_blank"
				rel="external"
				class="bg-custom-1 text-violet hover:bg-custom-3 hover:dark:bg-custom-6 focus:bg-custom-3 focus:dark:bg-custom-6 hover:text-violet focus:text-violet rounded-[5px] border-none px-5 py-4 text-[16px] font-bold no-underline outline-none hover:dark:text-white focus:dark:text-white"
			>
				Link vaga
			</a>
		</header>
		<main
			class="dark:bg-very-dark-blue mt-[9px] flex flex-col gap-8 rounded-[6px] bg-white px-6 py-[40px_0px]"
		>
			<header class="text-dark-gray flex items-center gap-3 text-[16px] font-normal">
				{timeAgo(job.created_at)}
				<span class="bg-dark-gray size-1 rounded-[50%]"></span>
				<div class="flex items-center gap-1">
					<Comment className="size-5 fill-violet" />
					<span>{job.comments}</span>
				</div>
			</header>
			<article
				class="text-dark-gray dark:text-gray text-[16px] leading-[26px] font-normal break-words"
			>
				{@html marked(job.body)}
			</article>
		</main>
	</div>
{:catch error}
	<div
		class="mx-auto flex h-[calc(100vh-376px)] max-w-[730px] items-center justify-center min-[450px]:h-[calc(100vh-406px)]"
	>
		<div class="flex flex-col items-center gap-3">
			<TriangleExclamation className="size-[80px] fill-violet" />
			<h3
				class="text-very-dark-blue text-center text-[20px] leading-[24px] font-semibold dark:text-white"
			>
				Ocorreu um erro inesperado ao buscar a vaga
			</h3>
			<p class="text-dark-gray dark:text-gray text-center text-[16px] leading-[26px] font-normal">
				{error.message}
			</p>
		</div>
	</div>
{/await}
