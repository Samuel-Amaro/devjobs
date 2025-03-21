<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/Button.svelte';
	import Card from '$lib/Card.svelte';
	import CardSkeleton from '$lib/CardSkeleton.svelte';
	import Filter from '$lib/Filter.svelte';
	import Table from '$lib/Icons/Table.svelte';
	import TriangleExclamation from '$lib/Icons/TriangleExclamation.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

{#snippet btnPagination(key: number, text: string)}
	{#if key}
		<Button variant="primary" class="flex-[0_0_140px] cursor-pointer">{text}</Button>
	{/if}
{/snippet}

<div>
	<Filter />
	<div
		class="mx-auto w-[calc(100vw-48px)] max-w-[1110px] p-[24px_0_136px_0] min-[768px]:w-[calc(100vw-80px)] min-[1180px]:p-[24px_0_136px_0]"
	>
		{#await data.data}
			<div class="flex flex-wrap justify-center gap-[40px_11px] min-[1110px]:gap-[40px_30px]">
				{#each { length: 6 }}
					<CardSkeleton />
				{/each}
			</div>
		{:then jobs}
			<div class="flex flex-col gap-8">
				{#if jobs.length > 0}
					<div class="flex flex-wrap justify-center gap-[40px_11px] min-[1110px]:gap-[40px_30px]">
						{#each jobs as job (job.id)}
							<Card
								title={job.title}
								createdAt={job.created_at}
								comments={job.comments}
								labels={job.labels}
								number={job.number}
							/>
						{/each}
					</div>
				{:else}
					<div
						class="text-very-dark-blue flex flex-col items-center justify-center gap-6 text-base font-medium dark:text-white"
					>
						<Table className="flex items-center justify-center fill-violet size-[120px]" />
						<p>Sem dados no momento</p>
					</div>
				{/if}
				{#if data.pagination.first || data.pagination.prev || data.pagination.next || data.pagination.last}
					<form class="dark:bg-very-dark-blue fixed bottom-0 left-0 w-full bg-white p-2.5">
						<div class="flex flex-col items-center justify-center gap-4">
							{#if page.url.searchParams.get('page')}
								<span
									class="text-custom-5 h-5 rounded-[4px] border px-2 text-[12px] leading-[20px] font-semibold"
									>Página {page.url.searchParams.get('page')}</span
								>
							{/if}
							<input
								type="hidden"
								name="page"
								value={data.pagination.prev?.toString() ||
									data.pagination.next?.toString() ||
									data.pagination.last?.toString() ||
									data.pagination.first?.toString()}
							/>
							<div class="flex items-center justify-center gap-2.5">
								{@render btnPagination(data.pagination.first, 'Início')}
								{@render btnPagination(data.pagination.prev, 'Anterior')}
								{@render btnPagination(data.pagination.next, 'Próxima')}
								{@render btnPagination(data.pagination.last, 'Ultíma')}
							</div>
						</div>
					</form>
				{/if}
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
						Ocorreu um erro inesperado ao buscar as vagas
					</h3>
					<p
						class="text-dark-gray dark:text-gray text-center text-[16px] leading-[26px] font-normal"
					>
						{error.message}
					</p>
				</div>
			</div>
		{/await}
	</div>
</div>
