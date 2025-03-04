import React, { useState, useEffect, useRef } from 'react';
import Style from './bookingBar.module.scss';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { BsCalendarRange } from 'react-icons/bs';

export default function BookingBar(props) {
	const [openDatePicker, setOpenDatePicker] = useState(false);

	const datePicker = useRef();

	useEffect(() => {
		const handleKeydown = (e) => {
			if (e.code === 'Escape') {
				setOpenDatePicker(false);
			}
		};
		const handleClick = (e) => {
			if (datePicker.current && !datePicker.current.contains(e.target)) {
				setOpenDatePicker(false);
				props.toggleModalBackground(false);
			}
		};

		document.addEventListener('keydown', handleKeydown);
		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('keydown', handleKeydown);
			document.removeEventListener('click', handleClick);
		};
	}, [props]);

	return (
		<div
			className={Style.Book}
			onClick={() => {
				setOpenDatePicker(true);
				props.toggleModalBackground(true);
			}}
			ref={datePicker}>
			<div className={Style.Icon}>
				<BsCalendarRange />
			</div>
			<h2>BOOK</h2>
			{openDatePicker && (
				<div className={Style.BookModal}>
					<div>
						<iframe
							id='booking-iframe'
							sandbox='allow-top-navigation allow-scripts allow-same-origin'
							style={{ width: '105%', height: '700px', transform: 'translateX(-2.5%)' }}
							frameborder='0'
							title='Booking Iframe'
							src='https://booking.hospitable.com/widget/9e5aad90-2857-48b7-963d-2fa213ecd5de/1678916'></iframe>
					</div>
				</div>
			)}
		</div>
	);
}
