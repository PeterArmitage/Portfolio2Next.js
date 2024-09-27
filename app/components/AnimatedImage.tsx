'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AnimatedImage = () => {
	const bubbleVariants = {
		hidden: { scale: 0, opacity: 0 },
		visible: { scale: 1, opacity: 1 },
	};

	return (
		<div className='flex justify-center items-center mb-12 relative'>
			<motion.div
				className='w-48 h-48 rounded-full border-4 border-white overflow-hidden'
				initial='hidden'
				animate='visible'
				variants={bubbleVariants}
				transition={{ duration: 0.5 }}
			>
				<Image
					src='/images/tonsinho.png'
					alt='Anime-style portrait'
					width={192}
					height={192}
				/>
			</motion.div>
			<div className='relative ml-8 w-24 h-48'>
				{[0.8, 0.6, 0.4].map((size, index) => (
					<motion.div
						key={index}
						className={`absolute bg-white rounded-full`}
						initial='hidden'
						animate='visible'
						variants={bubbleVariants}
						transition={{ duration: 0.3, delay: index * 0.2 }}
						style={{
							width: `${size * 48}px`,
							height: `${size * 48}px`,
							top: `${index * 25}%`,
							left: `${index * 10}%`,
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default AnimatedImage;
