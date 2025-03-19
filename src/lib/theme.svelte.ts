import { browser } from '$app/environment';
import type { TypeTheme } from '../types';

let initialTheme: TypeTheme = 'light';

export const loadingTheme = $state({ isLoading: true });

if (browser) {
	const themeSaved = window.localStorage.getItem('themeOption') as TypeTheme;

	if (themeSaved) {
		document.body.setAttribute('data-theme', themeSaved);
		initialTheme = themeSaved;
	} else {
		const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
		const theme = prefersLight ? 'light' : 'dark';
		initialTheme = theme;
		document.body.setAttribute('data-theme', theme);
		localStorage.setItem('themeOption', theme);
	}

	loadingTheme.isLoading = false;
}

export const theme = $state<{ option: TypeTheme }>({
	option: initialTheme as TypeTheme
});
