import { useTheme } from '../contexts/ThemeContext';

export const useHomeTheme = () => {
	const { theme } = useTheme();

	const backgroundAnimation =
		theme === 'light'
			? '/animations/daytime-sky.json'
			: '/animations/night-sky.json';

	const textColor = theme === 'light' ? '#0a0a0a' : '#ffffff';

	return { backgroundAnimation, textColor };
};
