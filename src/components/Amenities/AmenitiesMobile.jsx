import React, { useState, useEffect } from 'react';
import Style from './amenitiesMobile.module.scss';

export default function AmenitiesMobile() {
	const [scroll, setScroll] = useState(false);

	useEffect(() => {
		const onScroll = (event) => {
			if (window.pageYOffset >= 50) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		};

		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	return <div className={Style.App}></div>;
}
