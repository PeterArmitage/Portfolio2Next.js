import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button onClick={toggleTheme}>
			Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
		</button>
	);
};
