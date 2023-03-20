import { React } from 'react';
import styles from './loadingSpinner.module.scss';

function LoadingSpinner() {
	return (
		<div className={styles.container}>
			<div className={styles.skChase}>
				<div className={styles.skChaseDot}></div>
				<div className={styles.skChaseDot}></div>
				<div className={styles.skChaseDot}></div>
				<div className={styles.skChaseDot}></div>
				<div className={styles.skChaseDot}></div>
				<div className={styles.skChaseDot}></div>
			</div>
		</div>
	);
}

export default LoadingSpinner;
