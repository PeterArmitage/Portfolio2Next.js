import React from 'react';
import styles from './ProjectsSkeleton.module.scss';

const ProjectsSkeleton = () => {
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.projects}>
				<div className={styles.projectsHeader}>
					<span>
						<div className={styles.skeletonSvg} />
						<div className={styles.skeletonTitle} />
						<div className={styles.skeletonSvg} />
					</span>
				</div>
				<div className={styles.projectsList}>
					{[...Array(4)].map((_, index) => (
						<div
							key={index}
							className={`${styles.projectItem} ${styles.skeletonItem} ${
								index % 2 !== 0 ? styles.reverse : ''
							}`}
						>
							<div
								className={`${styles.projectImage} ${styles.skeletonImage}`}
							/>
							<div className={styles.projectDetails}>
								<div className={styles.skeletonTitle} />
								<div className={styles.skeletonText} />
								<div className={styles.skeletonText} />
								<div className={styles.stackSection}>
									<div className={styles.skeletonSubtitle} />
									<div className={styles.skeletonText} />
								</div>
								<div className={styles.buttonWrap}>
									<div
										className={`${styles.button} ${styles.skeletonButton}`}
									/>
									<div
										className={`${styles.button} ${styles.skeletonButton}`}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProjectsSkeleton;
