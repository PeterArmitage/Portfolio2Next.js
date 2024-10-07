'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import styles from './Projects.module.scss';
import Image from 'next/image';

const AnimatedBackground = dynamic(
	() => import('../../components/AnimatedBackground/AnimatedBackground'),
	{
		ssr: false,
	}
);

export default function Projects() {
	const { t } = useTranslation();
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const projects = [
		{
			title: t('projects.items.0.title'),
			image: '/images/dashboard.finance.png',
			description: t('projects.items.0.description'),
			stack:
				'Next.js, Prisma, Supabase, Tailwind CSS, Next Auth, Typescript, Shadcn-Ui, Zod',
			link: 'https://personalfinance84.netlify.app/',
			github: 'https://github.com/PeterArmitage/personal-finance',
		},
		{
			title: t('projects.items.1.title'),
			image: '/images/ExerciseLibrary.png',
			description: t('projects.items.1.description'),
			stack:
				'Next.js, Prisma, Supabase, Tailwind CSS, Next Auth, Typescript, Shadcn-Ui, Zod',
			link: 'https://fit-forge84.netlify.app/',
			github: 'https://github.com/PeterArmitage/FitnessApp',
		},
		{
			title: t('projects.items.2.title'),
			image: '/images/todoscreen.png',
			description: t('projects.items.2.description'),
			stack: 'Python, Tkinter, Flask',
			link: 'https://pythontodo.netlify.app/',
			github: 'https://github.com/PeterArmitage/python_todo',
		},
		{
			title: t('projects.items.3.title'),
			image: '/images/portfoliopic.png',
			description: t('projects.items.3.description'),
			stack: 'React with Vite, I18next, Tailwind CSS',
			link: 'https://portfoliopa84.netlify.app/',
			github: 'https://github.com/PeterArmitage/portfolio',
		},
	];

	return (
		<div className={styles.pageWrapper}>
			{isClient && <AnimatedBackground videoSrc='videos/neon1.mp4' />}
			<div className={styles.projects}>
				<div className={styles.projectsHeader}>
					<span>
						<svg
							width='16'
							height='40'
							viewBox='0 0 8 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							{/* SVG path */}
						</svg>
						<h2>{t('projects.title')}</h2>
						<svg
							width='16'
							height='40'
							viewBox='0 0 8 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							{/* SVG path */}
						</svg>
					</span>
				</div>
				<div className={styles.projectsList}>
					{projects.map((project, index) => (
						<div
							key={index}
							className={`${styles.projectItem} ${
								index % 2 !== 0 ? styles.reverse : ''
							}`}
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
						>
							<div className={styles.projectImage}>
								<Image
									src={project.image}
									alt={project.title}
									className={hoveredIndex === index ? styles.hovered : ''}
									width={500}
									height={500}
								/>
							</div>
							<div className={styles.projectDetails}>
								<h4>{project.title}</h4>
								<p>{project.description}</p>
								<div className={styles.stackSection}>
									<h5>{t('projects.techStack')}</h5>
									<p>{project.stack}</p>
								</div>
								<div className={styles.buttonWrap}>
									<a
										href={project.link}
										target='_blank'
										rel='noopener noreferrer'
										className={styles.button}
									>
										{t('projects.visit')} &rarr;
									</a>
									<a
										href={project.github}
										target='_blank'
										rel='noopener noreferrer'
										className={`${styles.button} ${styles.githubButton}`}
									>
										{t('projects.github')} &rarr;
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
