import Style from './book.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { add, format } from 'date-fns';
import { keys } from '../../api_keys.js';

function Book() {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [reserveActive, setReserveActive] = useState(false);
	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [guests, setGuests] = useState(1);
	const [disabledDates, setDisabledDates] = useState([]);

	// const disabledDates = [add(new Date(), { days: 1 }), add(new Date(), { days: 3 })];

	const handleSelect = (ranges) => {
		console.log(ranges);
		// if (ranges.selection.startDate === ranges.selection.endDate) {
		// 	const start = ranges.selection.startDate;
		// 	setStartDate(ranges.selection.startDate);
		// 	setEndDate(add(new Date(start), { days: 1 }));
		// }

		setStartDate(ranges.selection.startDate);
		setEndDate(ranges.selection.endDate);
	};

	const selectionRange = {
		startDate: startDate,
		endDate: endDate,
		key: 'selection',
	};

	const currentDate = new Date();
	const currentDateFormatted = format(currentDate, 'yyyy-MM-dd');
	const maxDate = add(currentDate, { months: 6 });
	const maxDateFormatted = format(maxDate, 'yyyy-MM-dd');

	const propertyID = '964614';
	const HOSPITABLE_API_KEY = '';

	const options = {
		method: 'GET',
		url: `https://api.hospitable.com/calendar/${propertyID}`,
		params: { start_date: currentDateFormatted, end_date: maxDateFormatted },
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${HOSPITABLE_API_KEY}`,
			'Content-Type': 'application/vnd.hospitable.20190904+json',
		},
	};

	let days = [];
	const getCalendar = async () => {
		await axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
				days = response.data.data.days;
				let disabled = [];
				for (const day in days) {
					if (!days[day].status.available) disabled.push(Date.parse(days[day].date));
				}
				setDisabledDates(disabled);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	const getDate = () => {
		// const newDate = format(add(new Date(), { months: 6 }), 'yyyy-mm-dd');
		console.log(currentDateFormatted);
		console.log(maxDateFormatted);
	};

	return (
		<div className={Style.Book}>
			<button onClick={() => getDate()}>GET Date</button>
			<button onClick={() => getCalendar()}>GET TOKEN</button>
			<div className='date-picker'>
				<DateRange
					className='date-range'
					ranges={[selectionRange]}
					onChange={handleSelect}
					minDate={new Date()}
					rangeColors={['#90d2d2']}
					disabledDates={disabledDates}
					monthHeight={6}
					startDatePlaceholder={'Check-in'}
					endDatePlaceholder={'Checkout'}
					months={2}
					direction={'horizontal'}
					maxDate={maxDate}
				/>
			</div>
		</div>
	);
}

export default Book;

// const options = {
// 	method: 'POST',
// 	url: 'https://auth.hospitable.com/oauth/token',
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// data: {
// 	client_id: keys.HOSPITABLE_CLIENT_ID,
// 	client_secret: keys.HOSPITABLE_TOKEN,
// 	audience: 'api.hospitable.com',
// 	grant_type: 'client_credentials',
// },
// };

// const getApiKey = async () => {
// 	await axios
// 		.request(options)
// 		.then(function (response) {
// 			console.log(response.access_token);
// 		})
// 		.catch(function (error) {
// 			console.error(error);
// 		});
// };

// const getApiKey = async () => {
// 	await axios
// 		.post(
// 			'https://auth.hospitable.com/oauth/token',
// 			{
// 				client_id: keys.HOSPITABLE_CLIENT_ID,
// 				client_secret: keys.HOSPITABLE_TOKEN,
// 				audience: 'api.hospitable.com',
// 				grant_type: 'client_credentials',
// 			},
// 			{
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 			}
// 		)
// 		.then(function (response) {
// 			console.log(response.access_token);
// 		})
// 		.catch(function (error) {
// 			console.error(error);
// 		});
// };
