'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from './About.module.scss';
import ContactFormModal from '@/app/components/ContactFormModal/ContactFormModal';

const AnimatedImage = dynamic(
	() => import('../../components/AnimatedImage/AnimatedImage'),
	{
		ssr: false,
	}
);
const AnimatedBackground = dynamic(
	() => import('../../components/AnimatedBackground/AnimatedBackground'),
	{
		ssr: false,
	}
);

const About = () => {
	const [isClient, setIsClient] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		setIsClient(true);
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
						<p>
							Hello! My name is Pete and I&apos;m a self-taught full stack
							developer with a passion for creating functional and engaging
							websites. Originally from the UK, I&apos;ve been calling Brazil my
							home for the past 14 years, embracing the vibrant culture and
							diverse experiences it offers.
						</p>
						<p>
							My journey in web development has been driven by an insatiable
							curiosity and a love for learning. I thrive on the ever-evolving
							nature of this field, always eager to explore new technologies and
							methodologies. React has captured my heart, but I&apos;m also
							nurturing a growing interest in game development, aiming to
							combine my coding skills with my love for interactive
							entertainment.
						</p>
						<p>
							As a developer, I pride myself on being a strong team player. I
							believe in the power of collaboration and the magic that happens
							when diverse minds come together to solve problems and create
							innovative solutions.
						</p>
						<p>
							Beyond coding, I&apos;m a bit of a nerd at heart. I have a deep
							appreciation for anime and manga, finding inspiration in their
							storytelling and artistry. When I&apos;m not immersed in lines of
							code or the latest manga chapter, you might find me cheering for
							my favorite football team or working on my fitness.
						</p>
						<p>
							I&apos;m always excited to connect with like-minded individuals
							who share my passions. Whether you want to discuss the latest
							anime series, debate football tactics, or explore new frontiers in
							web development, I&apos;m all ears!
						</p>
						<p>
							Oh, and did I mention my love for animals? They bring so much joy
							and companionship to our lives!
						</p>
					</div>

					<div className={styles.connectSection}>
						{isClient && <AnimatedImage />}
						<h3>Let&apos;s Connect!</h3>
						<p>
							I&apos;d love to hear about your interests in anime, manga,
							fitness, sports, or web development. Feel free to reach out and
							start a conversation!
						</p>
						<button onClick={handleOpenModal}>Get in Touch</button>
					</div>
				</div>
			</div>
			{isModalOpen && <div className={styles.overlay} />}
			<ContactFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
		</div>
	);
};

export default About;
