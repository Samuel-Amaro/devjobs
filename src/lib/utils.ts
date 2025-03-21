// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildQueryParams = (filters: Record<string, any>): string => {
	const params = new URLSearchParams();

	Object.entries(filters).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== '') {
			params.append(key, String(value));
		}
	});

	const queryString = params.toString();
	return queryString ? `?${queryString}` : '';
};

export const parsePaginationLinks = (linkHeader: string | null) => {
	const pagination: { [key: string]: number } = {};

	if (linkHeader) {
		const links = linkHeader.split(', ');
		links.forEach((link) => {
			const match = link.match(/<.*?[?&]page=(\d+).*?>; rel="(.*?)"/);
			if (match) {
				const pageNumber = Number(match[1]);
				const relName = match[2];
				pagination[relName] = pageNumber;
			}
		});
	}

	return pagination;
};

export function timeAgo(timestamp: string): string {
	const pastDate = new Date(timestamp);
	const now = new Date();

	const seconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if (years > 0) return `${years} ano${years > 1 ? 's' : ''} atrás`;
	if (months > 0) return `${months} mês${months > 1 ? 'es' : ''} atrás`;
	if (days > 0) return `${days} dia${days > 1 ? 's' : ''} atrás`;
	if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
	if (minutes > 0) return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;

	return `agora mesmo`;
}
