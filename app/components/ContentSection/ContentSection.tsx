import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './ContentSection.module.scss';

interface ContentSectionProps {
	title: string;
	content: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, content }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<motion.div
			ref={ref}
			className={styles.section}
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.5 }}
		>
			<h2>{title}</h2>
			<p>{content}</p>
		</motion.div>
	);
};

export default ContentSection;
