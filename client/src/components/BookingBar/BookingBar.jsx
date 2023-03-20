import React, { useState, useEffect, useRef } from 'react';
import Style from './bookingBar.module.scss';
import { LoadingSpinner } from 'components';
import { Link } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { TfiArrowCircleRight } from 'react-icons/tfi';
import { BsCalendarRange, BsPeopleFill } from 'react-icons/bs';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { add, format } from 'date-fns';

export default function BookingBar(props) {
	const [reserveActive, setReserveActive] = useState(false);
	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [checkout, setCheckout] = useState(false);
	const [minStay, setMinStay] = useState(1);
	const [minStayNotMet, setMinStayNotMet] = useState(false);

	const datePicker = useRef();
	const button = useRef();

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
		if (ranges.selection.startDate === ranges.selection.endDate) {
			// this works because when you select the check in date, it sets that exact object as the checkout date as well, until a checkout date is selected
			setCheckout(true);
		} else {
			setCheckout(false);
			let start = format(ranges.selection.startDate, 'yyyy-MM-dd');
			const min_stay = props.availableData[start].min_stay;
			setMinStay(min_stay);
			if (format(ranges.selection.startDate, 'yyyy-MM-dd') === format(ranges.selection.endDate, 'yyyy-MM-dd')) {
				setMinStayNotMet(true);
				return;
			}
			let dates = [start];
			let current = ranges.selection.startDate;
			let end = false;
			while (!end) {
				current = add(current, { days: 1 });
				const formatted = format(current, 'yyyy-MM-dd');
				if (formatted === format(ranges.selection.endDate, 'yyyy-MM-dd')) {
					end = true;
					break;
				}
				dates.push(formatted);
			}
			if (dates.length < min_stay) {
				setMinStayNotMet(true);
			} else {
				setMinStayNotMet(false);
			}
			// console.log(dates);
			props.setDates(dates);
		}

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
						{props.disabledDates.length > 0 ? (
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
							/>
						) : (
							<div className={Style.CalendarLoading}>
								<LoadingSpinner />
							</div>
						)}
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
			<div className={reserveActive && !minStayNotMet ? Style.ButtonReserve : Style.Button} ref={button}>
				{reserveActive && !minStayNotMet ? (
					<Link to='/book'>
						<div className={Style.ButtonText}>
							<h4>Reserve</h4>
							<span>
								<TfiArrowCircleRight />
							</span>
						</div>
					</Link>
				) : (
					<div className={Style.ButtonText}>
						{minStayNotMet ? (
							<h4 className={Style.MinStayNotMet}>{`Minimum stay ${minStay} day${
								minStay > 1 ? 's' : ''
							}`}</h4>
						) : (
							<h4>Check Availability</h4>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
