import React, { useState } from 'react';
import Style from './bookingBarMobile.module.scss';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { BsCalendarRange } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function BookingBarMobile(props) {
	const [editDates, setEditDates] = useState(false);

	return (
		<div className={Style.Book}>
			<div onClick={() => setEditDates(true)} className={Style.SelectDates}>
				<div className={Style.Icon}>
					<BsCalendarRange />
				</div>
				<h4>Select Dates</h4>
			</div>

			{editDates && (
				<div className={Style.Modal}>
					<div className={Style.ModalBackground}></div>
					<div className={Style.Back} onClick={() => setEditDates(false)}>
						<AiFillCloseCircle />
					</div>
					<div className={Style.IframeContainer}>
						<iframe
							id='booking-iframe'
							sandbox='allow-top-navigation allow-scripts allow-same-origin'
							style={{ height: '630px' }}
							frameborder='0'
							title='Booking Iframe'
							src='https://booking.hospitable.com/widget/9d356214-f5c1-4110-b87c-787c7afe4551/1304268'></iframe>
					</div>
				</div>
			)}
		</div>
	);
}
