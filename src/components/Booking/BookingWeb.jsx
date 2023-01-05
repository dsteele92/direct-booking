import React, { useState, useEffect } from 'react';
import Style from './bookingWeb.module.scss';

export default function BookingWeb() {
	const [scroll, setScroll] = useState(false);
	const [top, setTop] = useState(false);

	useEffect(() => {
		const onScroll = (event) => {
			if (window.pageYOffset >= 50) {
				setScroll(true);
			} else {
				setScroll(false);
			}
			if (window.pageYOffset > 0.8 * window.innerHeight) {
				setTop(true);
			} else {
				setTop(false);
			}
		};

		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	return (
		<div className={!scroll ? Style.Book : !top ? Style.BookScroll : Style.BookTop}>
			{/* <div className={Style.StickyBackground}></div> */}
			<div className={Style.Inner}>
				<div className={Style.Booker}>
					<div>Check In</div>
					<div>Check Out</div>
					<div>Guests</div>
					<div>Check Availability</div>
				</div>
			</div>
		</div>
	);
}
