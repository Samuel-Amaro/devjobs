export type TypeTheme = 'light' | 'dark';

export type TypeLabel = {
	id: number;
	name: string;
	color: string;
	default: boolean;
	description?: string;
};

export type TypeIssue = {
	url: string;
	html_url: string;
	comments_url: string;
	id: number;
	number: number;
	title: string;
	user: {
		login: string;
		id: number;
		avatar_url: string;
	};
	labels: TypeLabel[];
	state: string;
	comments: number;
	created_at: string;
	updated_at: string;
	body: string;
};
