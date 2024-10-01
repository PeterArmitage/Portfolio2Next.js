// components/ContactIcons/ContactIcons.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedInIcon, WhatsAppIcon } from './ContactIcons';
import styles from './test.module.scss';

const ContactIcons: React.FC = () => {
	const iconVariants = {
		initial: { scale: 0, opacity: 0 },
		animate: { scale: 1, opacity: 1 },
		hover: { scale: 1.2, transition: { duration: 0.2 } },
	};

	const containerVariants = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const icons = [
		{ href: 'https://github.com/PeterArmitage', Icon: GithubIcon },
		{
			href: 'https://www.linkedin.com/in/peter-armitage-601105a9/',
			Icon: LinkedInIcon,
		},
		{
			href: `https://wa.me/5515981851508?text=${encodeURIComponent(
				'Hello, I found your contact on your website.'
			)}`,
			Icon: WhatsAppIcon,
		},
	];

	return (
		<motion.div
			className={styles.contactIcons}
			variants={containerVariants}
			initial='initial'
			animate='animate'
		>
			{icons.map(({ href, Icon }, index) => (
				<motion.a
					key={index}
					href={href}
					className={styles.icon}
					target='_blank'
					rel='noopener noreferrer'
					variants={iconVariants}
					whileHover='hover'
					onClick={(e) => {
						console.log('Icon clicked:', href);
					}}
				>
					<Icon />
				</motion.a>
			))}
		</motion.div>
	);
};

export default ContactIcons;
