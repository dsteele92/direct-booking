import Style from './book.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { add, format } from 'date-fns';
import { keys } from '../../api_keys.js';
import { BsArrowLeft } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { LR3sm } from 'images';
import { FormControl, TextField, Select, InputLabel, MenuItem, Button, Checkbox } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme.js';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';

function Book(props) {
	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [avgPrice, setAvgPrice] = useState('');
	const [price, setPrice] = useState('');
	const [totalPrice, setTotalPrice] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('+1');
	const [continueToPayment, setContinueToPayment] = useState(false);
	const [editDates, setEditDates] = useState(false);
	const [checkout, setCheckout] = useState(false);
	const [minStay, setMinStay] = useState(1);
	const [minStayNotMet, setMinStayNotMet] = useState(false);

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
		setAvgPrice((total / props.dates.length).toLocaleString());
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
							<div className={Style.Edit}>Edit</div>
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
							<Button variant='contained' size='large'>
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
				<div className={Style.Modal}>
					<div className={Style.ModalBackground} onClick={() => setEditDates(false)}></div>
					<div className={Style.Inner}>
						<div className={Style.Close} onClick={() => setEditDates(false)}>
							<AiFillCloseCircle />
						</div>
						<div className={Style.Content}>
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
								direction={'horizontal'}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Book;

// const currentDate = new Date();
// const currentDateFormatted = format(currentDate, 'yyyy-MM-dd');
// const maxDate = add(currentDate, { months: 6 });
// const maxDateFormatted = format(maxDate, 'yyyy-MM-dd');

// const propertyID = '964614';
// const HOSPITABLE_API_KEY = '';

// const options = {
// 	method: 'GET',
// 	url: `https://api.hospitable.com/calendar/${propertyID}`,
// 	params: { start_date: currentDateFormatted, end_date: maxDateFormatted },
// 	headers: {
// 		accept: 'application/json',
// 		Authorization: `Bearer ${HOSPITABLE_API_KEY}`,
// 		'Content-Type': 'application/vnd.hospitable.20190904+json',
// 	},
// };

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
