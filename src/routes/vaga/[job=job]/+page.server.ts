import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { TypeIssue } from '../../../types';
import { BASE_URL } from '$env/static/private';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const urlApi = `${BASE_URL}/issues/${params.job}`;

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
		} else if (response.status === 404) {
			error(response.status, {
				message: 'Vaga não encontrada',
				title: 'Oopss.. Vaga não encontrada',
				action: 'Volte para nosso quadro de vagas e busque por vagas existentes.'
			});
		} else {
			error(response.status, {
				message:
					'Ocorreu um erro inesperado, estamos trabalhando para corrigir, por favor volte novamente mais tarde.'
			});
		}
	} else {
		return {
			job: response.json() as Promise<TypeIssue>
		};
	}
};
