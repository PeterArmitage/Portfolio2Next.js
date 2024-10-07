import React from 'react';
import styles from './SkillsSkeleton.module.scss';

const SkillsSkeleton = () => {
	return (
		<div className={styles.skills}>
			<div className={styles.leftSide}>
				{[...Array(4)].map((_, index) => (
					<div key={index} className={styles.skillsContainer}>
						{[...Array(6)].map((_, itemIndex) => (
							<div key={itemIndex} className={styles.skillItemSkeleton}>
								<div className={styles.iconSkeleton} />
								<div className={styles.titleSkeleton} />
							</div>
						))}
					</div>
				))}
			</div>
			<div className={styles.rightSide}>
				<div className={styles.catNameSkeleton} />
				<div className={styles.percentageSkeleton} />
			</div>
		</div>
	);
};

export default SkillsSkeleton;
