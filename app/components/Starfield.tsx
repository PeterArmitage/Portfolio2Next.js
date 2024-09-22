import styles from './Starfield.module.scss';

export default function Starfield() {
	return (
		<div className={styles.starfield}>
			{[...Array(100)].map((_, i) => (
				<div
					key={i}
					className={styles.star}
					style={{
						top: `${Math.random() * 100}%`,
						left: `${Math.random() * 100}%`,
						animationDelay: `${Math.random() * 5}s`,
					}}
				></div>
			))}
		</div>
	);
}
