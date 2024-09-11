import { motion } from 'framer-motion';
import { AnimationProps } from '../types';

const AnimatedSection: React.FC<AnimationProps> = ({ children, key }) => (
	<motion.div
		key={key}
		initial={{ x: '100%', opacity: 0 }}
		animate={{ x: 0, opacity: 1 }}
		exit={{ x: '-100%', opacity: 0 }}
		transition={{ duration: 0.5 }}
		className='absolute w-full h-full'
	>
		{children}
	</motion.div>
);

export default AnimatedSection;
