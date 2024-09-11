import { Sections } from '../types';

interface NavigationProps {
	sections: Sections;
	handleNavigation: (section: keyof Sections) => void;
}

const Navigation: React.FC<NavigationProps> = ({
	sections,
	handleNavigation,
}) => (
	<nav className='absolute top-4 left-4 flex flex-col sm:flex-row'>
		{Object.entries(sections).map(
			([key, { label }]) =>
				key !== 'home' && (
					<button
						key={key}
						onClick={() => handleNavigation(key as keyof Sections)}
						className='mb-2 sm:mb-0 sm:mr-4 text-white'
					>
						{label}
					</button>
				)
		)}
	</nav>
);

export default Navigation;
