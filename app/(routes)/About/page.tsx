'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import styles from './About.module.scss';
import ContactFormModal from '@/app/components/ContactFormModal/ContactFormModal';
import Skeleton from '../../components/Skeleton/Skeleton';

const AnimatedImage = dynamic(
	() => import('../../components/AnimatedImage/AnimatedImage'),
	{ ssr: false }
);
const AnimatedBackground = dynamic(
	() => import('../../components/AnimatedBackground/AnimatedBackground'),
	{ ssr: false }
);

const About = () => {
	const { t } = useTranslation();
	const [isClient, setIsClient] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		setIsClient(true);

		const timer = setTimeout(() => setIsLoading(false), 1500);
		return () => clearTimeout(timer);
	}, []);

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	return (
		<div
			className={`${styles.pageWrapper} ${isModalOpen ? styles.modalOpen : ''}`}
		>
			{isClient && <AnimatedBackground videoSrc='/videos/makima2.mp4' />}
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.textContent}>
						{isLoading ? (
							<div>
								<Skeleton type='text' />
								<Skeleton type='text' />
								<Skeleton type='text' />
								<Skeleton type='text' />
								<Skeleton type='text' />
								<Skeleton type='text' />
							</div>
						) : (
							<div>
								<p>{t('about.intro')}</p>
								<p>{t('about.journey')}</p>
								<p>{t('about.teamwork')}</p>
								<p>{t('about.interests')}</p>
								<p>{t('about.connection')}</p>
								<p>{t('about.animals')}</p>
							</div>
						)}
					</div>

					<div className={styles.connectSection}>
						{isClient && <AnimatedImage />}
						{isLoading ? (
							<div>
								<Skeleton type='title' />
								<Skeleton type='text' />
								<Skeleton type='button' />
							</div>
						) : (
							<div>
								<h3>{t('about.connect.title')}</h3>
								<p>{t('about.connect.description')}</p>
								<button onClick={handleOpenModal}>
									{t('about.connect.button')}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			{isModalOpen && <div className={styles.overlay} />}
			<ContactFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
		</div>
	);
};

export default About;
