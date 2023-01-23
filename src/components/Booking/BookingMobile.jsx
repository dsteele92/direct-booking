import React, { useState, useEffect } from 'react';
import Style from './bookingMobile.module.scss';
import { BsCalendarRange } from 'react-icons/bs';

export default function BookingMobile() {
	return (
		<div className={Style.BookingMobile}>
			<h2>
				<span>
					<BsCalendarRange />
				</span>{' '}
				Check Availability
			</h2>
		</div>
	);
}
