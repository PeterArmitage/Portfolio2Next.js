'use client';
import React from 'react';
import Link from 'next/link';
import {
	PersonIcon,
	EnvelopeClosedIcon,
	HomeIcon,
	LightningBoltIcon,
} from '@radix-ui/react-icons';
import { Sections } from '../types';
import GlitchEffect from './GlitchEffect';
import { motion } from 'framer-motion';
import styles from './Navigation.module.scss';

interface NavigationProps {
	sections: Sections;
}

const iconMap: { [key: string]: React.ComponentType } = {
	Home: HomeIcon,
	About: PersonIcon,
	Skills: LightningBoltIcon,
	Contacts: EnvelopeClosedIcon,
};

const Navigation: React.FC<NavigationProps> = ({ sections }) => {
	const containerVariants = {
		hidden: { width: '3rem', height: '3rem' },
		visible: { width: 'auto', height: '3rem' },
	};

	const iconVariants = {
		hidden: { opacity: 1, scale: 1 },
		visible: { opacity: 0, scale: 0 },
	};

	const textVariants = {
		hidden: { opacity: 0, scale: 0 },
		visible: { opacity: 1, scale: 1 },
	};

	return (
		<nav className={styles.nav}>
			<ul className={styles.navList}>
				{Object.entries(sections).map(([key, { label }]) => {
					const Icon = iconMap[label] || PersonIcon;
					return (
						<li key={key}>
							<Link href={`/${key}`}>
								<GlitchEffect>
									<motion.div
										className={styles.navItem}
										variants={containerVariants}
										initial='hidden'
										whileHover='visible'
									>
										<motion.div
											variants={iconVariants}
											className={styles.iconContainer}
										>
											<div className={styles.icon}>
												<Icon />
											</div>
										</motion.div>
										<motion.span
											className={styles.label}
											variants={textVariants}
										>
											{label}
										</motion.span>
									</motion.div>
								</GlitchEffect>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navigation;
