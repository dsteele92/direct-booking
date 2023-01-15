import React, { useState, useEffect, Component } from 'react';
import Style from './bookingWeb.module.scss';
import { TfiArrowCircleRight } from 'react-icons/tfi';

export default function BookingWeb() {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [focusedInput, setFocusedInput] = useState(null);

	return (
		<div className={Style.Book}>
			{/* <div className={Style.Booker}>
				<DateRangePicker
					startDate={startDate} // momentPropTypes.momentObj or null,
					startDateId='your_unique_start_date_id' // PropTypes.string.isRequired,
					endDate={endDate} // momentPropTypes.momentObj or null,
					endDateId='your_unique_end_date_id' // PropTypes.string.isRequired,
					onDatesChange={({ startDate, endDate }) => {
						setStartDate(startDate);
						setEndDate(endDate);
					}} // PropTypes.func.isRequired,
					focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
					onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
				/>
				<div>Guests</div>
			</div>
			<div className={Style.Button}>
				<h4>
					Check <br />
					Availability
				</h4>
				<TfiArrowCircleRight />
			</div> */}
		</div>
	);
}
