import Style from './book.module.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from 'components';
import { Link, useSearchParams } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { add, format, parseISO, sub } from 'date-fns';
import { BsArrowLeft, BsPeopleFill } from 'react-icons/bs';
import { AiFillCloseCircle, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { LR3sm } from 'images';
import { FormControl, TextField, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme.js';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';

function Book(props) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [avgPrice, setAvgPrice] = useState(0);
	const [price, setPrice] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [taxes, setTaxes] = useState(0);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('+1');
	const [continueToPayment, setContinueToPayment] = useState(false);
	const [editDates, setEditDates] = useState(false);
	const [editGuests, setEditGuests] = useState(false);
	const [editPets, setEditPets] = useState(false);
	const [checkout, setCheckout] = useState(false);
	const [minStay, setMinStay] = useState(1);
	const [minStayNotMet, setMinStayNotMet] = useState(false);
	const [startDateUpdate, setStartDateUpdate] = useState(props.startDate);
	const [endDateUpdate, setEndDateUpdate] = useState(props.endDate);
	const [guestsUpdate, setGuestsUpdate] = useState(props.guests);
	const [petsUpdate, setPetsUpdate] = useState(props.pets);
	const [datesError, setDatesError] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (searchParams.has('data')) {
			const returnData = JSON.parse(atob(searchParams.get('data')));
			setFirstName(returnData.client.firstName);
			setLastName(returnData.client.lastName);
			setEmail(returnData.client.email);
			setPhone(returnData.client.phone);
			props.setDates(returnData.dates);
			props.setStartDate(new Date(returnData.startDate));
			props.setEndDate(new Date(returnData.endDate));
			props.setGuests(returnData.guests);
			props.setPets(returnData.pets);
		}
		if (searchParams.has('datesError')) {
			setDatesError(true);
		}
	}, []);

	useEffect(() => {
		if (Object.keys(props.availableData).length > 0) {
			let total = 0;
			for (const day in props.dates) {
				const amt = props.availableData[props.dates[day]].price;
				total += amt;
			}
			total = total / 100;
			const totalRounded = total;
			let withFees = total + 185;
			if (props.pets) withFees += 150;
			const taxes = withFees * 0.155 + props.dates.length * 4;
			setPrice(totalRounded);
			setTotalPrice((withFees + taxes).toFixed());
			setAvgPrice((total / props.dates.length).toFixed());
			setTaxes(taxes.toFixed());
		}
	}, [props.availableData, props.dates, props.pets]);

	useEffect(() => {
		if (price && firstName && lastName && email && matchIsValidTel(phone)) {
			setContinueToPayment(true);
		} else {
			setContinueToPayment(false);
		}
	}, [price, firstName, lastName, email, phone]);

	const handleSelect = (ranges) => {
		// console.log(JSON.stringify(ranges.selection.startDate) === JSON.stringify(ranges.selection.endDate));
		if (JSON.stringify(ranges.selection.startDate) === JSON.stringify(ranges.selection.endDate)) {
			// this works because when you select the check in date, it sets that exact object as the checkout date as well, until a checkout date is selected
			setCheckout(true);
		} else {
			setCheckout(false);
			let start = format(ranges.selection.startDate, 'yyyy-MM-dd');
			const min_stay = props.availableData[start].min_stay;
			setMinStay(min_stay);

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
	const savePets = () => {
		props.setPets(petsUpdate);
		setEditPets(false);
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
	const closePets = () => {
		setEditPets(false);
		setPetsUpdate(props.pets);
	};

	const handleSubmit = (req, res) => {
		setLoading(true);
		// const url = 'https://us-central1-tabor-bnb.cloudfunctions.net/api/create-checkout-session';
		const url = 'http://localhost:10000/create-checkout-session';
		const data = {
			url_data: btoa(
				JSON.stringify({
					client: { firstName: firstName, lastName: lastName, email: email, phone: phone },
					token: props.token,
					dates: props.dates,
					startDate: props.startDate,
					endDate: props.endDate,
					guests: props.guests,
					pets: props.pets,
					checkin: format(props.startDate, 'MMMM dd, yyyy'),
					checkout: format(props.endDate, 'MMMM dd, yyyy'),
				})
			),
		};

		axios
			.post(url, data)
			.then((res) => {
				// console.log(res.data);
				window.location.href = res.data.url;
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleKeyDown = (e) => {
		if (!continueToPayment) return;
		if (e.key === 'Enter') {
			handleSubmit();
		}
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
								<div className={Style.Info2}>
									{props.startDate && props.endDate ? (
										<div>
											<div>
												Check in:{' '}
												<span
													style={{
														fontWeight: 500,
														color: '#52758a',
													}}>{`${format(props.startDate, 'MMMM dd, yyyy')}`}</span>
											</div>
											<div>
												Check out:{' '}
												<span
													style={{
														fontWeight: 500,
														color: '#52758a',
													}}>{`${format(props.endDate, 'MMMM dd, yyyy')}`}</span>
											</div>
										</div>
									) : (
										'Select dates'
									)}
								</div>
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
						<div className={Style.SubSection}>
							<div className={Style.Info}>
								<div className={Style.Info1}>Pets</div>
								<div className={Style.Info2}>{props.pets ? 'Yes' : 'No'}</div>
							</div>
							<div className={Style.Edit} onClick={() => setEditPets(true)}>
								Edit
							</div>
						</div>
					</section>
					<section>
						<h2>Cancellation Policy</h2>
						<div className={Style.SubSection}>
							{props.startDate ? (
								<h4>
									{format(props.startDate, 'yyyy-MM-dd') >
									format(add(new Date(), { days: 14 }), 'yyyy-MM-dd') ? (
										<p>
											Cancel by{' '}
											{format(
												add(new Date(), {
													days: 2,
												}),
												'MMMM dd, yyyy'
											)}{' '}
											for a full refund.
										</p>
									) : (
										''
									)}
									{format(props.startDate, 'yyyy-MM-dd') >
									format(add(new Date(), { days: 7 }), 'yyyy-MM-dd') ? (
										<>
											<p>
												Cancel by{' '}
												{format(
													sub(new Date(props.startDate), {
														days: 7,
													}),
													'MMMM dd, yyyy'
												)}{' '}
												for a 50% refund.
											</p>
											<p>After that, this reservation is non-refundable.</p>
										</>
									) : (
										<p>This reservation is non-refundable.</p>
									)}
								</h4>
							) : (
								<h4>Select dates to see cancellation policy.</h4>
							)}
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
											onKeyDown={handleKeyDown}
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
											onKeyDown={handleKeyDown}
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
									onKeyDown={handleKeyDown}
								/>
								<MuiTelInput
									value={phone}
									color={matchIsValidTel(phone) ? 'success' : 'warning'}
									margin='dense'
									defaultCountry='US'
									label='Phone'
									fullWidth={true}
									onChange={(value) => setPhone(value)}
									onKeyDown={handleKeyDown}
								/>
							</FormControl>
						</ThemeProvider>
					</section>
					<div className={Style.Button}>
						{continueToPayment ? (
							<Button variant='contained' size='large' onClick={handleSubmit}>
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
							{price ? (
								<div className={Style.PriceDetails}>
									<div className={Style.Detail}>
										<div>{`$${avgPrice} x ${props.dates.length} night${
											props.dates.length > 1 ? 's' : ''
										}`}</div>
										<div>{`$${price}`}</div>
									</div>
									<div className={Style.Detail}>
										<div>Cleaning Fee</div>
										<div>$185</div>
									</div>
									{props.pets ? (
										<div className={Style.Detail}>
											<div>Pet Fee</div>
											<div>$150</div>
										</div>
									) : (
										''
									)}
									<div className={Style.Detail}>
										<div>Taxes</div>
										<div>{`$${taxes}`}</div>
									</div>
									<div className={Style.Total}>
										<div>Total with taxes (USD)</div>
										<div>{`$${totalPrice}`}</div>
									</div>
								</div>
							) : (
								<div>Selct dates to see price details.</div>
							)}
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
									rangeColors={['#dab3ae']}
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
			{editPets && (
				<div className={Style.GuestsModal}>
					<div className={Style.ModalBackground} onClick={closePets}></div>
					<div className={Style.Inner}>
						<div className={Style.Close} onClick={closePets}>
							<AiFillCloseCircle />
						</div>
						<div className={Style.Content}>
							<div className={Style.SelectGuests}>
								<h1>Select Pets</h1>
								<div className={Style.Guests}>
									<div className={Style.Icon}>
										<BsPeopleFill />
									</div>
									<div className={Style.Select}>
										<div className={Style.Count}>
											<h4>{`${petsUpdate}`}</h4>
										</div>
										<div className={Style.Arrows}>
											<div
												className={`${Style.Arrow} ${petsUpdate === 5 ? Style.Disable : ''}`}
												onClick={() => {
													if (petsUpdate < 5) setPetsUpdate(petsUpdate + 1);
												}}>
												<AiOutlinePlus />
											</div>
											<div
												className={`${Style.Arrow} ${petsUpdate === 0 ? Style.Disable : ''}`}
												onClick={() => {
													if (petsUpdate > 0) setPetsUpdate(petsUpdate - 1);
												}}>
												<AiOutlineMinus />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={Style.Save}>
								<ThemeProvider theme={theme}>
									<Button variant='outlined' color='primary' onClick={savePets}>
										Save
									</Button>
								</ThemeProvider>
							</div>
						</div>
					</div>
				</div>
			)}
			{datesError && (
				<div className={Style.ErrorModal}>
					<div className={Style.ModalBackground} onClick={() => setDatesError(false)}></div>
					<div className={Style.Inner}>
						<div className={Style.Close} onClick={() => setDatesError(false)}>
							<AiFillCloseCircle />
						</div>
						<div className={Style.Content}>
							<h1>Error</h1>
							<p>The dates you selected are unavailable. Please select different dates.</p>
							<div className={Style.Button}>
								<ThemeProvider theme={theme}>
									<Button variant='outlined' color='primary' onClick={() => setDatesError(false)}>
										Return
									</Button>
								</ThemeProvider>
							</div>
						</div>
					</div>
				</div>
			)}
			{loading && (
				<div className={Style.LoadingSpinner}>
					<LoadingSpinner />
				</div>
			)}
		</div>
	);
}

export default Book;
