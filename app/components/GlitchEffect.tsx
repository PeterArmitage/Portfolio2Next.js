'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface GlitchEffectProps {
	children: React.ReactNode;
}

const GlitchEffect: React.FC<GlitchEffectProps> = ({ children }) => {
	const glitchVariants: Variants = {
		hover: {
			x: [0, -2, 2, -2, 2, 0],
			transition: {
				duration: 0.3,
				repeat: 0,
			},
		},
	};

	return (
		<motion.div
			whileHover='hover'
			variants={glitchVariants}
			className='relative inline-block'
		>
			{children}
			<motion.div
				className='absolute inset-0 text-[#00ff00] opacity-50'
				style={{ clipPath: 'inset(50% 0 50%)' }}
				variants={glitchVariants}
			>
				{children}
			</motion.div>
		</motion.div>
	);
};

export default GlitchEffect;
