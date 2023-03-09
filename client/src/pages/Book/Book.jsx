import Style from './book.module.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { add, format } from 'date-fns';
import { BsArrowLeft, BsPeopleFill } from 'react-icons/bs';
import { AiFillCloseCircle, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { LR3sm } from 'images';
import { FormControl, TextField, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme.js';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';

function Book(props) {
	const [avgPrice, setAvgPrice] = useState('');
	const [price, setPrice] = useState('');
	const [totalPrice, setTotalPrice] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('+1');
	const [continueToPayment, setContinueToPayment] = useState(false);
	const [editDates, setEditDates] = useState(false);
	const [editGuests, setEditGuests] = useState(false);
	const [checkout, setCheckout] = useState(false);
	const [minStay, setMinStay] = useState(1);
	const [minStayNotMet, setMinStayNotMet] = useState(false);
	const [startDateUpdate, setStartDateUpdate] = useState(props.startDate);
	const [endDateUpdate, setEndDateUpdate] = useState(props.endDate);
	const [guestsUpdate, setGuestsUpdate] = useState(props.guests);

	useEffect(() => {
		let total = 0;
		for (const day in props.dates) {
			const amt = props.availableData[props.dates[day]].price;
			total += amt;
		}
		const totalStr = total.toString().slice(0, -2);
		total = Number(totalStr);
		const withFees = total + 185;
		setPrice(total.toLocaleString());
		setTotalPrice(withFees.toLocaleString());
		setAvgPrice((total / props.dates.length).toFixed().toLocaleString());
	}, [props.availableData, props.dates]);

	useEffect(() => {
		if (firstName && lastName && email && matchIsValidTel(phone)) {
			setContinueToPayment(true);
		} else {
			setContinueToPayment(false);
		}
	}, [firstName, lastName, email, phone]);

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

		setStartDateUpdate(ranges.selection.startDate);
		setEndDateUpdate(ranges.selection.endDate);
	};

	const selectionRange = {
		startDate: startDateUpdate,
		endDate: endDateUpdate,
		key: 'selection',
	};

	const saveDates = () => {
		props.setStartDate(startDateUpdate);
		props.setEndDate(endDateUpdate);
		setEditDates(false);
	};
	const saveGuests = () => {
		props.setGuests(guestsUpdate);
		setEditGuests(false);
	};

	const closeDates = () => {
		setEditDates(false);
		setStartDateUpdate(props.startDate);
		setEndDateUpdate(props.endDate);
	};
	const closeGuests = () => {
		setEditGuests(false);
		setGuestsUpdate(props.guests);
	};

	const pay = async () => {
		const data = {};
		await axios({
			method: 'post',
			url: 'http://localhost:10000/create-checkout-session',
			data: data,
		});
	};

	return (
		<div className={Style.Page}>
			<div className={Style.Book}>
				<div className={Style.Header}>
					<Link to='/'>
						<div className={Style.Arrow}>
							<BsArrowLeft />
						</div>
					</Link>
					<h1>Confirm & Pay</h1>
				</div>
				<div className={Style.Left}>
					<section>
						<h2>Your Trip</h2>
						<div className={Style.SubSection}>
							<div className={Style.Info}>
								<div className={Style.Info1}>Dates</div>
								<div className={Style.Info2}>{`${format(props.startDate, 'MMM dd')} - ${format(
									props.endDate,
									'MMM dd'
								)}`}</div>
							</div>
							<div className={Style.Edit} onClick={() => setEditDates(true)}>
								Edit
							</div>
						</div>
						<div className={Style.SubSection}>
							<div className={Style.Info}>
								<div className={Style.Info1}>Guests</div>
								<div className={Style.Info2}>{`${props.guests} guest${
									props.guests > 1 ? 's' : ''
								}`}</div>
							</div>
							<div className={Style.Edit} onClick={() => setEditGuests(true)}>
								Edit
							</div>
						</div>
					</section>
					<section>
						<h2>Cancellation Policy</h2>
						<div className={Style.SubSection}>
							<p>
								Cancel before check-in on ---DATE - 48hours--- for a partial refund. After that, this
								reservation is non-refundable
							</p>
						</div>
					</section>
					<section>
						<h2>Contact Information</h2>
						<ThemeProvider theme={theme}>
							<FormControl margin='dense'>
								<div className={Style.Names}>
									<div className={Style.Name}>
										<TextField
											margin='dense'
											color={firstName ? 'success' : 'warning'}
											id='goal'
											variant='outlined'
											label='First Name'
											fullWidth={true}
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</div>
									<div className={Style.Name}>
										<TextField
											margin='dense'
											color={lastName ? 'success' : 'warning'}
											id='goal'
											variant='outlined'
											label='Last Name'
											fullWidth={true}
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</div>
								</div>
								<TextField
									margin='dense'
									color={email ? 'success' : 'warning'}
									id='goal'
									variant='outlined'
									label='Email'
									fullWidth={true}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<MuiTelInput
									value={phone}
									color={matchIsValidTel(phone) ? 'success' : 'warning'}
									margin='dense'
									defaultCountry='US'
									label='Phone'
									fullWidth={true}
									onChange={(value) => setPhone(value)}
								/>
							</FormControl>
						</ThemeProvider>
					</section>
					<div className={Style.Button}>
						{continueToPayment ? (
							<Button variant='contained' size='large' onClick={pay}>
								Continue to Payment
							</Button>
						) : (
							<Button variant='contained' size='large' disabled>
								Continue to Payment
							</Button>
						)}

						<h4 style={{ margin: '20px 0', fontStyle: 'italic' }}>You will be redirected to Stripe</h4>
					</div>
				</div>
				<div className={Style.Right}>
					<section className={Style.Price}>
						<div className={Style.Overview}>
							<div className={Style.Image} style={{ backgroundImage: `url(${LR3sm.url})` }}></div>
							<h4>Exquisite Boho 4BR/3.5BA - Steps from Mt Tabor Park</h4>
						</div>
						<div className={Style.SubSection}>
							<h2>Price Details</h2>
							<div className={Style.PriceDetails}>
								<div className={Style.Detail}>
									<div>{`$${avgPrice} x ${props.dates.length} nights`}</div>
									<div>{`$${price}`}</div>
								</div>
								<div className={Style.Detail}>
									<div>Cleaning Fee</div>
									<div>$185</div>
								</div>
								<div className={Style.Total}>
									<div>Total before taxes (USD)</div>
									<div>{`$${totalPrice}`}</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
			{editDates && (
				<div className={Style.DatesModal}>
					<div className={Style.ModalBackground} onClick={closeDates}></div>
					<div className={Style.Inner}>
						<div className={Style.Close} onClick={closeDates}>
							<AiFillCloseCircle />
						</div>
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
										<Button variant='outlined' color='primary' onClick={saveDates}>
											Save
										</Button>
									) : (
										<Button variant='outlined' color='primary' disabled>
											Save
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
					</div>
				</div>
			)}
			{editGuests && (
				<div className={Style.GuestsModal}>
					<div className={Style.ModalBackground} onClick={closeGuests}></div>
					<div className={Style.Inner}>
						<div className={Style.Close} onClick={closeGuests}>
							<AiFillCloseCircle />
						</div>
						<div className={Style.Content}>
							<div className={Style.SelectGuests}>
								<h1>Select Guests</h1>
								<div className={Style.Guests}>
									<div className={Style.Icon}>
										<BsPeopleFill />
									</div>
									<div className={Style.Select}>
										<div className={Style.Count}>
											<h4>{`${guestsUpdate} Guest${guestsUpdate > 1 ? 's' : ''}`}</h4>
										</div>
										<div className={Style.Arrows}>
											<div
												className={`${Style.Arrow} ${guestsUpdate === 10 ? Style.Disable : ''}`}
												onClick={() => {
													if (guestsUpdate < 10) setGuestsUpdate(guestsUpdate + 1);
												}}>
												<AiOutlinePlus />
											</div>
											<div
												className={`${Style.Arrow} ${guestsUpdate === 1 ? Style.Disable : ''}`}
												onClick={() => {
													if (guestsUpdate > 1) setGuestsUpdate(guestsUpdate - 1);
												}}>
												<AiOutlineMinus />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={Style.Save}>
								<ThemeProvider theme={theme}>
									<Button variant='outlined' color='primary' onClick={saveGuests}>
										Save
									</Button>
								</ThemeProvider>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Book;
