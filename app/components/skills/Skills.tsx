'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { skillCat, HardSkillCategory } from './skillsData';
import dynamic from 'next/dynamic';
import styles from './Skills.module.scss';

const SkillItem = dynamic(() => import('./SkillItem'), { ssr: false });

import {
	skillsAnim,
	leftAnim,
	rightAnim,
	skillCatAnim,
} from './skillAnimations';

export default function Skills() {
	const { t } = useTranslation();
	const { soft: _, ...hardSkills } = skillCat;
	const skillInterval = useRef<NodeJS.Timeout | null>(null);
	const skillTimeout = useRef<NodeJS.Timeout | null>(null);

	const [softSkillIndex, setSoftSkillIndex] = useState(0);
	const [skillCategory, setSkillCategory] =
		useState<keyof typeof skillCat>('soft');
	const [isMounted, setIsMounted] = useState(false);

	const softSkillsLength = (
		t('skills.softSkills', { returnObjects: true }) as string[]
	).length;

	const softSkillChange = useCallback(() => {
		if (typeof window !== 'undefined') {
			skillInterval.current = setInterval(() => {
				setSoftSkillIndex((prev) => (prev + 1) % softSkillsLength);
			}, 4500);
		}
	}, [softSkillsLength]);

	const skillMouseEnter = (name: keyof typeof skillCat) => {
		setSkillCategory(name);
		if (skillInterval.current) clearInterval(skillInterval.current);
		if (skillTimeout.current) clearTimeout(skillTimeout.current);
	};

	const skillMouseLeave = useCallback(() => {
		if (typeof window !== 'undefined') {
			skillTimeout.current = setTimeout(() => {
				setSkillCategory('soft');
				softSkillChange();
			}, 150);
		}
	}, [softSkillChange]);

	useEffect(() => {
		setIsMounted(true);
		softSkillChange();
		return () => {
			if (skillInterval.current) clearInterval(skillInterval.current);
			if (skillTimeout.current) clearTimeout(skillTimeout.current);
		};
	}, [softSkillChange]);

	if (!isMounted) {
		return null;
	}

	return (
		<motion.section
			className={styles.skills}
			variants={skillsAnim}
			initial='init'
			animate='anim'
			exit='end'
		>
			<motion.div className={styles.leftSide} variants={leftAnim}>
				{Object.entries(hardSkills).map(([key, skill]) => (
					<div
						key={key}
						className={styles.skillsContainer}
						onMouseEnter={() => skillMouseEnter(key as keyof typeof skillCat)}
						onMouseLeave={skillMouseLeave}
					>
						{(skill as HardSkillCategory).skillList.map(
							({ name, icon, xp }) => (
								<SkillItem key={name} icon={icon} title={name} xp={xp} />
							)
						)}
					</div>
				))}
			</motion.div>
			<motion.div className={styles.rightSide} variants={rightAnim}>
				<AnimatePresence mode='wait'>
					{skillCategory === 'soft' ? (
						<motion.h1
							key={`s${softSkillIndex}`}
							className={styles.catName}
							variants={skillCatAnim}
							initial='hidden'
							animate='visible'
							exit='exit'
						>
							{t(`skills.softSkills.${softSkillIndex}`)}
						</motion.h1>
					) : (
						<motion.h1
							key={`h${skillCategory}`}
							className={styles.catName}
							data-category={skillCategory}
							variants={skillCatAnim}
							initial='hidden'
							animate='visible'
							exit='exit'
						>
							{t(skillCat[skillCategory].categoryName)}
						</motion.h1>
					)}
				</AnimatePresence>
				<div className={styles.percentage}>
					<span className={styles.counterView}>
						{skillCat[skillCategory].percentage}%
					</span>
				</div>
			</motion.div>
		</motion.section>
	);
}
