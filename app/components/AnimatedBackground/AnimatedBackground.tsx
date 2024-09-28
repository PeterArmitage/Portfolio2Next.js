'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './AnimatedBackground.module.scss';

const AnimatedBackground = () => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.play().catch((error) => {
				console.error('Error attempting to play video:', error);
			});
		}
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			className={styles.backgroundContainer}
		>
			<video
				ref={videoRef}
				className={styles.backgroundVideo}
				autoPlay
				loop
				muted
				playsInline
			>
				<source src='/videos/makima2.mp4' type='video/mp4' />
				Your browser does not support the video tag.
			</video>
			<div className={styles.videoOverlay}></div>
		</motion.div>
	);
};

export default AnimatedBackground;
