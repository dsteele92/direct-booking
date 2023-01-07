import React, { useState, useEffect } from 'react';
import Style from './bookingWeb.module.scss';
import { TfiArrowCircleRight } from 'react-icons/tfi';

export default function BookingWeb() {
	return (
		<div className={Style.Book}>
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
				<TfiArrowCircleRight />
			</div>
		</div>
	);
}
