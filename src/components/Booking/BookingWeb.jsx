import React, { useState, useEffect } from 'react';
import Style from './bookingWeb.module.scss';
import { IoIosArrowDropright } from 'react-icons/io';

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
		<div className={scroll ? Style.Book : Style.BookScroll}>
			<div className={Style.Booker}>
				<div>Check In</div>
				<div>Check Out</div>
				<div>Guests</div>
			</div>
			<div className={Style.Button}>
				<h4>
					Check <br />
					Availability
				</h4>
				<IoIosArrowDropright />
			</div>
		</div>
	);
}
