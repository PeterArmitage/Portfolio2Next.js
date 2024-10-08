'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher: React.FC = () => {
	const { i18n } = useTranslation();
	const [isFlipping, setIsFlipping] = useState(false);

	const toggleLanguage = () => {
		setIsFlipping(true);
		setTimeout(() => {
			i18n.changeLanguage(i18n.language === 'en' ? 'pt' : 'en');
			setIsFlipping(false);
		}, 250);
	};

	return (
		<div className={styles.languageSwitcher}>
			<AnimatePresence mode='wait'>
				<motion.div
					key={i18n.language}
					initial={{ rotateY: 0 }}
					animate={{ rotateY: isFlipping ? 180 : 0 }}
					exit={{ rotateY: 180 }}
					transition={{ duration: 0.5 }}
					onClick={toggleLanguage}
				>
					{i18n.language === 'en' ? (
						<Image
							src='/images/brazil2.png'
							alt='Brazilian Flag'
							width={50}
							height={50}
							className='rounded-md'
							loading='lazy'
						/>
					) : (
						<Image
							src='/images/usa2.png'
							alt='US Flag'
							width={40}
							height={40}
							className='rounded-md'
							loading='lazy'
						/>
					)}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default LanguageSwitcher;
