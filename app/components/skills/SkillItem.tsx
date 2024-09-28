import React from 'react';
import styles from './Skills.module.scss';

import { IconType } from 'react-icons';

interface SkillItemProps {
	icon: IconType;
	title: string;
	xp: string;
}

const SkillItem: React.FC<SkillItemProps> = ({ icon: Icon, title, xp }) => {
	return (
		<div className={styles.skill}>
			<div className={styles.iconContainer}>
				<Icon size={30} />
			</div>
			<div className={styles.skillContent}>
				<p>{title}</p>
				<p>XP: {xp}</p>
			</div>
		</div>
	);
};

export default SkillItem;
