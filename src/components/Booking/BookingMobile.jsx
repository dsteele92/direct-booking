import React, { useState, useEffect } from 'react';
import Style from './bookingWeb.module.scss';

export default function BookingWeb() {
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
