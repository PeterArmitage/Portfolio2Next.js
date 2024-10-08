'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import {
	PersonIcon,
	EnvelopeClosedIcon,
	HomeIcon,
	LightningBoltIcon,
} from '@radix-ui/react-icons';
import { Sections } from '../../types';
import GlitchEffect from '../GlitchEffect';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navigation.module.scss';

interface NavigationProps {
	sections: Sections;
	onOpenContactModal?: () => void;
}

const iconMap: { [key: string]: React.ComponentType } = {
	Home: HomeIcon,
	About: PersonIcon,
	Skills: LightningBoltIcon,
	Contacts: EnvelopeClosedIcon,
};

const Navigation: React.FC<NavigationProps> = ({
	sections,
	onOpenContactModal,
}) => {
	const { t } = useTranslation();
	const [hoveredItem, setHoveredItem] = useState<string | null>(null);
	const [previewPosition, setPreviewPosition] = useState({ top: 0, left: 0 });
	const navRef = useRef<HTMLElement>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const updatePreviewPosition = (event: MouseEvent) => {
			if (navRef.current && hoveredItem) {
				const navRect = navRef.current.getBoundingClientRect();
				const x = event.clientX - navRect.left;
				const y = event.clientY - navRect.top;
				let left = x - 75;
				const windowWidth = window.innerWidth;

				if (left + 150 > windowWidth) {
					left = windowWidth - 150;
				} else if (left < 0) {
					left = 0;
				}

				setPreviewPosition({
					top: y + 20,
					left: left,
				});
			}
		};
		setIsLoading(false);
		document.addEventListener('mousemove', updatePreviewPosition);
		return () =>
			document.removeEventListener('mousemove', updatePreviewPosition);
	}, [hoveredItem]);
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

	const renderNavItem = (
		key: string,
		label: string,
		isContactItem: boolean
	) => {
		const Icon = iconMap[label] || PersonIcon;
		const translatedLabel = t(`navigation.${label}`);

		const content = (
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
								{translatedLabel}
							</motion.span>
						)}
					</AnimatePresence>
					{(key === 'Skills' || key === 'About' || key === 'contacts') &&
						hoveredItem === key && (
							<div
								className={styles.previewBox}
								style={{
									top: `${previewPosition.top}px`,
									left: `${previewPosition.left}px`,
								}}
							>
								<Image
									src={`/images/${key.toLowerCase()}-preview.png`}
									alt={`${key} preview`}
									width={150}
									height={100}
									layout='responsive'
								/>
							</div>
						)}
				</motion.div>
			</GlitchEffect>
		);

		if (isContactItem) {
			return <div onClick={onOpenContactModal}>{content}</div>;
		} else {
			return <Link href={`/${key}`}>{content}</Link>;
		}
	};
	if (isLoading) return null;
	return (
		<nav className={styles.nav}>
			<ul className={styles.navList}>
				{Object.entries(sections).map(([key, { label }]) => {
					const isContactItem = key === 'contacts';
					return (
						<li key={key}>
							{isContactItem ? (
								<div onClick={onOpenContactModal}>
									{renderNavItem(key, label, isContactItem)}
								</div>
							) : (
								<Link href={`/${key}`}>
									{renderNavItem(key, label, isContactItem)}
								</Link>
							)}
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navigation;
