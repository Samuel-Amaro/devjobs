<script lang="ts">
	import type { TypeLabel } from '../types';
	import Comment from './Icons/Comment.svelte';
	import { timeAgo } from './utils';

	interface Props {
		title: string;
		createdAt: string;
		labels: TypeLabel[];
		comments: number;
		number: number;
	}

	let { title, createdAt, labels, comments, number }: Props = $props();
</script>

<article
	class="dark:bg-very-dark-blue flex min-h-[228px] w-full max-w-[350px] flex-col justify-between rounded-[6px] bg-white p-8"
>
	<header class="flex flex-col gap-3">
		<div class="text-dark-gray flex items-center gap-3 text-base font-normal">
			{timeAgo(createdAt)}
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<span class="bg-dark-gray size-1 rounded-[50%]" />
			<div class="flex items-center gap-1">
				<Comment className="size-5 fill-violet" />
				<span>{comments}</span>
			</div>
		</div>
		<a
			href={`/vaga/${number}`}
			{title}
			class="text-very-dark-blue hover:text-dark-gray w-full max-w-full overflow-hidden text-[20px] font-bold text-ellipsis whitespace-nowrap no-underline dark:text-white"
		>
			{title}
		</a>
	</header>
	<ul class="m-0 flex list-none flex-wrap items-center gap-2.5 p-0">
		{#each labels as label (label.id)}
			<li
				style={`color: #${label.color}`}
				class="h-5 rounded-[4px] border-[1px] px-2 text-[12px] leading-[20px] font-bold"
			>
				{label.name}
			</li>
		{/each}
	</ul>
</article>
