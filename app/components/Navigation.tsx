'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
	PersonIcon,
	EnvelopeClosedIcon,
	HomeIcon,
	LightningBoltIcon,
} from '@radix-ui/react-icons';
import { Sections } from '../types';
import GlitchEffect from './GlitchEffect';
import { motion, AnimatePresence } from 'framer-motion';
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
	const [hoveredItem, setHoveredItem] = useState<string | null>(null);

	const iconVariants = {
		initial: { rotate: 0 },
		animate: {
			rotate: 360,
			transition: {
				duration: 10,
				repeat: Infinity,
				ease: 'linear',
			},
		},
		exit: { opacity: 0, transition: { duration: 0.2 } },
	};

	const textVariants = {
		initial: { opacity: 0 },
		animate: { opacity: 1, transition: { duration: 0.2 } },
		exit: { opacity: 0, transition: { duration: 0.2 } },
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
										onHoverStart={() => setHoveredItem(key)}
										onHoverEnd={() => setHoveredItem(null)}
									>
										<AnimatePresence initial={false}>
											{hoveredItem !== key && (
												<motion.div
													key='icon'
													variants={iconVariants}
													className={styles.iconContainer}
													initial='initial'
													animate='animate'
													exit='exit'
												>
													<div className={styles.icon}>
														<Icon />
													</div>
												</motion.div>
											)}
											{hoveredItem === key && (
												<motion.span
													key='text'
													className={styles.label}
													variants={textVariants}
													initial='initial'
													animate='animate'
													exit='exit'
												>
													{label}
												</motion.span>
											)}
										</AnimatePresence>
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
