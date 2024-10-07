import React from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
	type: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ type }) => {
	const classes = `${styles.skeleton} ${styles[type]}`;
	return <div className={classes} />;
};

export default Skeleton;
