'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import styles from './AnimatedImage.module.scss';

const AnimatedImage = () => {
	const [imageIndices, setImageIndices] = useState({ current: 0, next: 1 });
	const controls = useAnimation();
	const isMountedRef = useRef(false);

	const images = [
		'/images/tonsinho.png',
		'/images/euzinho.png',
		'/images/wifeinha.png',
		'/images/rhaerhae.jpeg',
	];

	const rotationDuration = 8;

	const updateIndices = useCallback(() => {
		setImageIndices((prev) => ({
			current: prev.next,
			next: (prev.next + 1) % images.length,
		}));
	}, [images.length]);

	const animate = useCallback(async () => {
		if (!isMountedRef.current) return;

		await controls.start({
			rotateY: 360,
			transition: { duration: rotationDuration, ease: 'linear' },
		});

		if (!isMountedRef.current) return;

		updateIndices();

		if (isMountedRef.current) {
			requestAnimationFrame(() => {
				if (isMountedRef.current) {
					controls.set({ rotateY: 0 });
					animate();
				}
			});
		}
	}, [controls, updateIndices]);

	useEffect(() => {
		isMountedRef.current = true;

		const timeoutId = setTimeout(() => {
			if (isMountedRef.current) {
				animate();
			}
		}, 0);

		return () => {
			isMountedRef.current = false;
			controls.stop();
			clearTimeout(timeoutId);
		};
	}, [animate, controls]);

	return (
		<div className={styles.container}>
			<motion.div className={styles.imageWrapper} animate={controls}>
				<motion.div
					className={styles.imageContainer}
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					transition={{ duration: rotationDuration }}
					key={imageIndices.current}
				>
					<Image
						src={images[imageIndices.current]}
						alt=''
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						style={{ objectFit: 'cover' }}
						priority
					/>
				</motion.div>
				<motion.div
					className={styles.backfaceImage}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: rotationDuration - 0.5 }}
					key={imageIndices.next}
				>
					<Image
						src={images[imageIndices.next]}
						alt=''
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						style={{ objectFit: 'cover' }}
						priority
					/>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default AnimatedImage;
