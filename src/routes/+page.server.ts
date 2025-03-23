import { buildQueryParams, parsePaginationLinks } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { TypeIssue } from '../types';
import { BASE_URL } from '$env/static/private';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const queryParams = buildQueryParams({
		labels: url.searchParams.get('search'),
		page: url.searchParams.get('page')
	});

	const urlApi = `${BASE_URL}/issues${queryParams}`;

	const response = await fetch(urlApi, { method: 'GET' });

	const ratelimitReset = response.headers.get('X-Ratelimit-Reset');

	if (!response.ok) {
		if (response.status === 403 || response.status === 429) {
			error(response.status, {
				message:
					'Nosso limite de consultas da API do GitHub foi atingido, como usamos o plano free, temos que esperar nosso timer de redefinição passar para que possamos realizar novas consultas',
				awaitTimestampReset: ratelimitReset ? parseInt(ratelimitReset as string) : 1739628906,
				action: 'Espere o tempo de redefinição, e atualize a página.',
				title: 'Indisponibilidade na consulta dos dados'
			});
		} else {
			error(response.status, {
				message:
					'Ocorreu um erro inesperado, estamos trabalhando para corrigir, por favor volte novamente mais tarde.'
			});
		}
	} else {
		const linksHeader = response.headers.get('Link');
		const pagination = parsePaginationLinks(linksHeader);

		return {
			data: response.json() as Promise<TypeIssue[]>,
			pagination
		};
	}
};
