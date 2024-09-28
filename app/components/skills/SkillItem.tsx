import React from 'react';
import Image from 'next/image';
import styles from './Skills.module.scss';

interface SkillItemProps {
	icon: string;
	title: string;
	xp: string;
}

const SkillItem: React.FC<SkillItemProps> = ({ icon, title, xp }) => {
	return (
		<div className={styles.skill}>
			<div className={styles.iconContainer}>
				<Image src={icon} alt={title} width={30} height={30} />
			</div>
			<div className={styles.skillContent}>
				<p>{title}</p>
				<p>XP: {xp}</p>
			</div>
		</div>
	);
};

export default SkillItem;
