import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Style from './bookingBar.module.scss';
import { Link } from 'react-router-dom';
import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { TfiArrowCircleRight } from 'react-icons/tfi';
import { BsCalendarRange, BsPeopleFill } from 'react-icons/bs';
import { RxPerson } from 'react-icons/rx';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { add, format, parseISO } from 'date-fns';

import { keys } from '../../api_keys.js';

export default function BookingWeb(props) {
	// const [startDate, setStartDate] = useState(null);
	// const [endDate, setEndDate] = useState(null);
	// const [guests, setGuests] = useState(1);
	const [reserveActive, setReserveActive] = useState(false);
	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [checkout, setCheckout] = useState(false);

	const datePicker = useRef();
	const button = useRef();

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
		if (JSON.stringify(props.startDate) !== JSON.stringify(props.endDate)) {
			setReserveActive(true);
		} else {
			setReserveActive(false);
		}
	}, [props.startDate, props.endDate]);

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
		// console.log(props.availableData);
		const availableDate = format(ranges.selection.startDate, 'yyyy-MM-dd');
		const min_stay = props.availableData[availableDate].min_stay;
		console.log(availableDate);
		console.log(min_stay);
		if (ranges.selection.startDate === ranges.selection.endDate) {
			// this works because when you select the check in date, it sets that exact object as the checkout date as well, until a checkout date is selected
			setCheckout(true);
		} else {
			setCheckout(false);
			// if (min_stay === 1) {
			// 	setDisabledDates(props.disabledDates);
			// } else {
			// let nextDays = [];
			// for (let stay = min_stay; stay > 1; stay--) {
			// 	const next = add(new Date(availableDate), { days: stay - 1 });
			// 	nextDays.push(next);
			// }
			// console.log(nextDays);
			// }
		}

		// console.log(availableDate);

		props.setStartDate(ranges.selection.startDate);
		props.setEndDate(ranges.selection.endDate);
	};

	const selectionRange = {
		startDate: props.startDate,
		endDate: props.endDate,
		key: 'selection',
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
						<div className={Style.Dates}>
							<div className={Style.Overlay}></div>
							<div className={Style.Start}>
								<h4>{props.startDate ? format(props.startDate, 'MMM dd') : 'Check-In'}</h4>
							</div>
							<div className={Style.End}>
								<h4>
									{props.endDate !== props.startDate ? format(props.endDate, 'MMM dd') : 'Check-Out'}
								</h4>
							</div>
						</div>
						<DateRange
							className={Style.DateRange}
							ranges={[selectionRange]}
							onChange={handleSelect}
							minDate={new Date()}
							rangeColors={['#52758a']}
							color={'#000000'}
							disabledDates={!checkout ? props.disabledDates : props.disabledCheckoutDates}
							monthHeight={6}
							startDatePlaceholder={'Check-in'}
							endDatePlaceholder={'Checkout'}
							// retainEndDateOnFirstSelection={true}
							// moveRangeOnFirstSelection={true}
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
						<div className={Style.Overlay}></div>
						<div className={Style.Count}>
							<h4>{`${props.guests} Guest${props.guests > 1 ? 's' : ''}`}</h4>
						</div>
						<div className={Style.Arrows}>
							<div
								className={`${Style.Arrow} ${props.guests === 10 ? Style.Disable : ''}`}
								onClick={() => {
									if (props.guests < 10) props.setGuests(props.guests + 1);
								}}>
								<AiOutlinePlus />
							</div>
							<div
								className={`${Style.Arrow} ${props.guests === 1 ? Style.Disable : ''}`}
								onClick={() => {
									if (props.guests > 1) props.setGuests(props.guests - 1);
								}}>
								<AiOutlineMinus />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={reserveActive ? Style.ButtonReserve : Style.Button} ref={button}>
				{reserveActive ? (
					<Link to='/book'>
						<div className={Style.ButtonText}>
							<h4>Reserve</h4>
							<TfiArrowCircleRight />
						</div>
					</Link>
				) : (
					<div className={Style.ButtonText}>
						<h4>Check Availability</h4>
					</div>
				)}
				{/* <h4 className={Style.Reserve}>Reserve</h4>
				<div className={Style.Icon}>
				</div> */}
			</div>
		</div>
	);
}
