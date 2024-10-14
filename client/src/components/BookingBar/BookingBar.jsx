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
			}
		};

		document.addEventListener('keydown', handleKeydown);
		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('keydown', handleKeydown);
			document.removeEventListener('click', handleClick);
		};
	}, []);

	return (
		<div className={Style.Book} onClick={() => setOpenDatePicker(true)} ref={datePicker}>
			<div className={Style.Booker}>
				<div className={Style.Icon}>
					<BsCalendarRange />
				</div>
				<div className={Style.DatePickerContainer}>
					<div className={openDatePicker ? Style.SelectDatesOpen : Style.SelectDates}>
						<div className={Style.Dates}>
							<div className={Style.Overlay}></div>
							<div className={Style.Start}>
								<h4>Check-In</h4>
							</div>
							<div className={Style.End}>
								<h4>Check-Out</h4>
							</div>
						</div>
						<div className={Style.IframeContainer}>
							<iframe
								id='booking-iframe'
								sandbox='allow-top-navigation allow-scripts allow-same-origin'
								style={{ width: '100%', height: '700px' }}
								frameborder='0'
								title='Booking Iframe'
								src='https://booking.hospitable.com/widget/9d356214-f5c1-4110-b87c-787c7afe4551/1304268'></iframe>
						</div>
					</div>
				</div>
			</div>
			<div className={Style.Button}>
				<div className={Style.ButtonText}>
					<h4>Check Availability</h4>
				</div>
			</div>
		</div>
	);
}
