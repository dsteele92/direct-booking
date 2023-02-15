import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Style from './bookingBar.module.scss';
import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { TfiArrowCircleRight } from 'react-icons/tfi';
import { BsCalendarRange, BsPeopleFill } from 'react-icons/bs';
import { RxPerson } from 'react-icons/rx';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { add, format } from 'date-fns';

import { keys } from '../../api_keys.js';

export default function BookingWeb() {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [reserveActive, setReserveActive] = useState(false);
	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [guests, setGuests] = useState(1);

	const datePicker = useRef();
	const button = useRef();

	const disabledDates = [add(new Date(), { days: 1 }), add(new Date(), { days: 3 })];

	const options = {
		method: 'GET',
		url: 'https://api.hospitable.com/calendar/964610',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/vnd.hospitable.20190904+json',
			authorization: 'Bearer',
		},
	};

	const api = async () => {
		await axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	useEffect(() => {
		if (startDate !== endDate) {
			setReserveActive(true);
		} else {
			setReserveActive(false);
		}
	}, [startDate, endDate]);

	useEffect(() => {
		const handleKeydown = (e) => {
			if (e.code === 'Escape') {
				setOpenDatePicker(false);
			}
		};
		const handleClick = (e) => {
			if (
				datePicker.current &&
				!datePicker.current.contains(e.target) &&
				button.current &&
				!button.current.contains(e.target)
			) {
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

	const reserve = () => {
		console.log('reserve');
	};

	return (
		<div className={Style.Book}>
			<div className={Style.Booker}>
				<div className={Style.Icon}>
					<BsCalendarRange />
				</div>
				<div className={Style.DatePickerContainer}>
					<div
						className={openDatePicker ? Style.SelectDatesOpen : Style.SelectDates}
						onClick={() => setOpenDatePicker(true)}
						ref={datePicker}>
						<div className={Style.DatesOverlay}></div>
						<DateRange
							className={Style.DateRange}
							ranges={[selectionRange]}
							onChange={handleSelect}
							minDate={new Date()}
							rangeColors={['#52758a']}
							color={'#000000'}
							disabledDates={disabledDates}
							monthHeight={6}
							startDatePlaceholder={'Check-in'}
							endDatePlaceholder={'Checkout'}
							// months={2}
							// direction={'horizontal'}
						/>
					</div>
				</div>
				<div className={Style.Guests}>
					<div className={Style.Icon}>
						<BsPeopleFill />
					</div>
					<div className={Style.Select}>
						<div className={Style.Count}>{`${guests} guest${guests > 1 ? 's' : ''}`} </div>
						<div className={Style.Arrows}>
							<div
								className={`${Style.Arrow} ${guests === 10 ? Style.Disable : ''}`}
								onClick={() => {
									if (guests < 10) setGuests(guests + 1);
								}}>
								<AiOutlinePlus />
							</div>
							<div
								className={`${Style.Arrow} ${guests === 1 ? Style.Disable : ''}`}
								onClick={() => {
									if (guests > 1) setGuests(guests - 1);
								}}>
								<AiOutlineMinus />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className={reserveActive ? Style.ButtonReserve : Style.Button}
				// onClick={() => {
				// 	if (reserveActive) {
				// 		reserve();
				// 	} else {
				// 		setOpenDatePicker(!openDatePicker);
				// 	}
				// }}
				onClick={() => api()}
				ref={button}>
				<h4 className={Style.Check}>
					Check <br />
					Availability
				</h4>
				<h4 className={Style.Reserve}>Reserve</h4>
				<div className={Style.Icon}>
					<TfiArrowCircleRight />
				</div>
			</div>
		</div>
	);
}
