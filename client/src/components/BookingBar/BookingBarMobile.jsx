import React, { useState, useEffect } from 'react';
import Style from './bookingBarMobile.module.scss';
import { LoadingSpinner } from 'components';
import { Link } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { BsCalendarRange } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { add, format } from 'date-fns';
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme.js';

export default function BookingBarMobile(props) {
	const [reserveActive, setReserveActive] = useState(false);
	const [checkout, setCheckout] = useState(false);
	const [minStay, setMinStay] = useState(1);
	const [minStayNotMet, setMinStayNotMet] = useState(false);
	const [editDates, setEditDates] = useState(false);

	useEffect(() => {
		if (JSON.stringify(props.startDate) !== JSON.stringify(props.endDate)) {
			setReserveActive(true);
		} else {
			setReserveActive(false);
		}
	}, [props.startDate, props.endDate]);

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

	const close = () => {
		setEditDates(false);
	};

	return (
		<div className={Style.Book}>
			<div className={Style.Booker} onClick={() => setEditDates(true)}>
				<div className={Style.Icon}>
					<BsCalendarRange />
				</div>
				<div className={Style.Dates}>
					<div className={Style.Start}>
						<h4>{props.startDate ? format(props.startDate, 'MMM dd') : 'Check-In'}</h4>
					</div>
					<div className={Style.End}>
						<h4>{props.endDate !== props.startDate ? format(props.endDate, 'MMM dd') : 'Check-Out'}</h4>
					</div>
				</div>
			</div>
			<div
				className={reserveActive && !minStayNotMet ? Style.ButtonReserve : Style.Button}
				onClick={() => setEditDates(true)}>
				{reserveActive && !minStayNotMet ? (
					<Link to='/book'>
						<div className={Style.ButtonText}>
							<h4>Reserve</h4>
						</div>
					</Link>
				) : (
					<div className={Style.ButtonText}>
						{minStayNotMet ? (
							<h4 className={Style.MinStayNotMet}>{`Minimum stay ${minStay} day${
								minStay > 1 ? 's' : ''
							}`}</h4>
						) : (
							<h4>Select Dates</h4>
						)}
					</div>
				)}
			</div>
			{editDates && (
				<div className={Style.Modal}>
					<div className={Style.ModalBackground} onClick={close}></div>
					<div className={Style.Inner}>
						<div className={Style.Close} onClick={close}>
							<AiFillCloseCircle />
						</div>
						{props.disabledDates.length > 0 ? (
							<div className={Style.Content}>
								<div className={Style.SelectDates}>
									<h1>Select Dates</h1>
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
										months={2}
										direction={window.innerWidth > 750 ? 'horizontal' : 'vertical'}
									/>
								</div>
								<div className={Style.Save}>
									<ThemeProvider theme={theme}>
										{!minStayNotMet && !checkout ? (
											<Link to='/book' className={Style.EditRangeButton}>
												<Button variant='outlined' color='primary'>
													Reserve
												</Button>
											</Link>
										) : (
											<Button
												variant='outlined'
												className={Style.EditRangeButton}
												color='primary'
												disabled>
												Reserve
											</Button>
										)}
									</ThemeProvider>
									<div className={Style.MinStay}>
										{minStayNotMet && (
											<p className={Style.MinStayNotMet}>{`Minimum stay ${minStay} day${
												minStay > 1 ? 's' : ''
											}`}</p>
										)}
									</div>
								</div>
							</div>
						) : (
							<div style={{ height: '100vh', width: '100vw' }}>
								<LoadingSpinner />
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
