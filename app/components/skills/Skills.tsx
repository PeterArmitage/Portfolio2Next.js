'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCat, HardSkillCategory } from './skillsData';
import SkillItem from './SkillItem';
import {
	skillsAnim,
	leftAnim,
	rightAnim,
	skillCatAnim,
} from './skillAnimations';
import styles from './Skills.module.scss';

export default function Skills() {
	const { soft: _, ...hardSkills } = skillCat;
	const skillInterval = useRef<NodeJS.Timeout | null>(null);
	const skillTimeout = useRef<NodeJS.Timeout | null>(null);
	const [softSkillIndex, setSoftSkillIndex] = useState<number>(0);
	const [skillCategory, setSkillCategory] =
		useState<keyof typeof skillCat>('soft');

	const softSkillChange = () => {
		skillInterval.current = setInterval(() => {
			setSoftSkillIndex(
				(prev) => (prev + 1) % skillCat['soft'].categoryName.length
			);
		}, 4500);
	};

	const skillMouseEnter = (name: string) => {
		setSkillCategory(name);
		if (skillInterval.current) clearInterval(skillInterval.current);
		if (skillTimeout.current) clearTimeout(skillTimeout.current);
	};

	const skillMouseLeave = () => {
		skillTimeout.current = setTimeout(() => {
			setSkillCategory('soft');
			softSkillChange();
		}, 150);
	};

	useEffect(() => {
		softSkillChange();
		return () => {
			if (skillInterval.current) clearInterval(skillInterval.current);
		};
	}, []);

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
						onMouseEnter={() => skillMouseEnter(key as string)}
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
							{skillCat['soft'].categoryName[softSkillIndex]}
						</motion.h1>
					) : (
						<motion.h1
							key={`h${skillCategory}`}
							className={styles.catName}
							variants={skillCatAnim}
							initial='hidden'
							animate='visible'
							exit='exit'
						>
							{skillCat[skillCategory].categoryName}
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
