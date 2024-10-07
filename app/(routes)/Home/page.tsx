'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './Home.module.scss';
import Lottie from 'lottie-react';
import ufo from '../../../public/ufo.json';
import ContactIcons from '../../components/ContactIcons/ContactIcons';
import AnimatedGlobe from '../../components/AnimatedGlobe/AnimatedGlobe';

const Home = () => {
	const { t } = useTranslation();
	const videoRef = useRef<HTMLVideoElement>(null);
	const controls = useAnimation();
	const [ufoPosition, setUfoPosition] = useState({ top: '50%', left: '50%' });
	const [showUfo, setShowUfo] = useState(true);

	const getRandomPosition = () => {
		const top = `${Math.random() * 80 + 10}%`;
		const left = `${Math.random() * 80 + 10}%`;
		return { top, left };
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 2,
				ease: 'easeInOut',
				when: 'beforeChildren',
				staggerChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 50, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.8 },
		},
	};

	const buttonVariants = {
		hover: {
			scale: 1.05,
			textShadow: '0 0 8px rgb(57, 255, 20)',
			boxShadow: '0 0 8px rgb(57, 255, 20)',
			transition: {
				duration: 0.3,
				yoyo: Infinity,
			},
		},
	};

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.play();
		}
		controls.start('visible');

		const intervalId = setInterval(() => {
			setShowUfo(false);
			setTimeout(() => {
				setUfoPosition(getRandomPosition());
				setShowUfo(true);
			}, 500);
		}, 8100);

		return () => clearInterval(intervalId);
	}, [controls]);

	return (
		<motion.div
			className={styles.container}
			variants={containerVariants}
			initial='hidden'
			animate={controls}
		>
			<video
				ref={videoRef}
				className={styles.backgroundVideo}
				autoPlay
				loop
				muted
				playsInline
			>
				<source src='/videos/space2.mp4' type='video/mp4' />
				Your browser does not support the video tag.
			</video>

			<div className={styles.videoOverlay}></div>

			<div className={styles.globeContainer}>
				<AnimatedGlobe />
			</div>

			{showUfo && (
				<motion.div
					className={styles.lottieContainer}
					style={{
						top: ufoPosition.top,
						left: ufoPosition.left,
					}}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Lottie animationData={ufo} loop={true} />
				</motion.div>
			)}
			<div className={styles.contactIconsWrapper}>
				<ContactIcons />
			</div>
			<motion.div className={styles.content} variants={itemVariants}>
				<motion.h1 className={styles.title} variants={itemVariants}>
					{t('home.title')}
				</motion.h1>
				<motion.p className={styles.subtitle} variants={itemVariants}>
					{t('home.subtitle')}
				</motion.p>
				<motion.div className={styles.buttonContainer} variants={itemVariants}>
					<Link href='/Projects' passHref>
						<motion.button
							className={`${styles.exploreButton} neon-pulse`}
							variants={buttonVariants}
							whileHover='hover'
						>
							{t('home.launchButton')}
						</motion.button>
					</Link>
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default Home;
