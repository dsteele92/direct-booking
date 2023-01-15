import React, { useState, useEffect, useRef } from 'react';
import Style from './bookingWeb.module.scss';
import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { TfiArrowCircleRight } from 'react-icons/tfi';
import { BsCalendarRange } from 'react-icons/bs';
import { RxPerson } from 'react-icons/rx';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { add } from 'date-fns';

export default function BookingWeb() {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(add(new Date(), { days: 1 }));
	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [guests, setGuests] = useState(1);

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
		};
	}, []);

	const handleSelect = (ranges) => {
		console.log(ranges);
		setStartDate(ranges.selection.startDate);
		setEndDate(ranges.selection.endDate);
	};

	const selectionRange = {
		startDate: startDate,
		endDate: endDate,
		key: 'selection',
	};

	return (
		<div className={Style.Book}>
			<div className={Style.Booker}>
				<div className={Style.Dates}>
					<div className={Style.Icon}>
						<BsCalendarRange />
					</div>
					<div className={Style.DatePickerContainer}>
						<div
							className={openDatePicker ? Style.SelectDatesOpen : Style.SelectDates}
							onClick={() => setOpenDatePicker(true)}
							ref={datePicker}>
							<DateRange
								className={openDatePicker ? Style.DateRangeOpen : Style.DateRange}
								ranges={[selectionRange]}
								onChange={handleSelect}
								minDate={new Date()}
								rangeColors={['#90d2d2']}
								disabledDates={[]}
								monthHeight={6}
								// months={2}
								// direction={'horizontal'}
							/>
						</div>
					</div>
				</div>
				<div className={Style.Guests}>
					<div className={Style.Icon}>
						<RxPerson />
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
