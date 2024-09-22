'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBoxesProps {
	children: React.ReactNode;
}

const AnimatedBoxes: React.FC<AnimatedBoxesProps> = ({ children }) => {
	return (
		<div className='relative'>
			{/* Static box */}
			<div className='absolute inset-0 border-2 border-[#00ff00] rounded-md' />

			{/* Animated box */}
			<motion.div
				className='absolute inset-0 border-2 border-[#00ff00] rounded-md'
				initial={{ rotate: 5 }}
				whileHover={{
					rotate: 0,
					transition: { duration: 0.3 },
				}}
			/>

			{/* Content */}
			<div className='relative z-10'>{children}</div>
		</div>
	);
};

export default AnimatedBoxes;
