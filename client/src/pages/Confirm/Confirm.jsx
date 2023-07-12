import Style from './confirm.module.scss';
import axios from 'axios';
import React, { useState, useEffect, memo } from 'react';
import { LoadingSpinner } from 'components';
import { Link, useSearchParams } from 'react-router-dom';
import { add, format, parseISO, sub } from 'date-fns';
import { BsArrowLeft, BsPeopleFill, BsCheck2Circle } from 'react-icons/bs';
import { AiFillCloseCircle, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { LR3sm } from 'images';

function Confirm(props) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [avgPrice, setAvgPrice] = useState(0);
	const [price, setPrice] = useState(0);
	const [taxes, setTaxes] = useState(0);
	const [amtPaid, setAmtPaid] = useState(0);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('+1');

	const [checkin, setCheckin] = useState('');
	const [checkout, setCheckout] = useState('');

	const [dates, setDates] = useState([]);
	const [guests, setGuests] = useState(1);
	const [pets, setPets] = useState(0);
	// set this to true when publishing ---------------------->
	const [loading, setLoading] = useState(true);
	// ******************* set all to false *******************
	const [datesReserved, setDatesReserved] = useState(true);
	const [datesReservedError, setDatesReservedError] = useState(false);
	const [emailsSent, setEmailsSent] = useState(false);
	const [emailsSentError, setEmailsSentError] = useState(false);
	// ------------------------------------------------------->
	const [confirmed, setConfirmed] = useState(true);
	// const [submitted, setSubmitted] = useState(true);

	const paymentData = searchParams.has('payment') ? JSON.parse(atob(searchParams.get('payment'))) : {};
	const returnData = searchParams.has('data') ? JSON.parse(atob(searchParams.get('data'))) : {};
	const bodyFormData = new FormData();

	const googleScripts = (bodyFormData) => {
		axios({
			method: 'post',
			url: 'https://script.google.com/macros/s/AKfycbzGjR9R5xpuvSW7EaLUnOttVDevKz7jDw5w08otAQ9MMllnBBe95vJAmDMGi3Ta9x2X/exec',
			data: bodyFormData,
			headers: { 'Content-Type': 'multipart/form-data' },
		})
			.then(function (response) {
				console.log(response);
				setEmailsSent(true);
			})
			.catch(function (response) {
				console.log(response);
				setEmailsSentError(true);
			});
	};

	useEffect(() => {
		if (searchParams.has('payment')) {
			setAmtPaid(paymentData.total);
			setAvgPrice(paymentData.avgPrice);
			setTaxes(paymentData.taxes);
			setPrice(paymentData.price);
			bodyFormData.append('amtPaid', paymentData.total);
		}
		if (searchParams.has('data')) {
			// console.log(returnData.dates);
			// console.log(new Date(returnData.dates[returnData.dates.length - 1]));
			setFirstName(returnData.client.firstName);
			setLastName(returnData.client.lastName);
			setEmail(returnData.client.email);
			setPhone(returnData.client.phone);
			setDates(returnData.dates);
			setCheckin(returnData.checkin);
			setCheckout(returnData.checkout);
			setGuests(returnData.guests);
			setPets(returnData.pets);

			bodyFormData.append('firstName', returnData.client.firstName);
			bodyFormData.append('lastName', returnData.client.lastName);
			bodyFormData.append('email', returnData.client.email);
			bodyFormData.append('phone', returnData.client.phone);
			bodyFormData.append('startDate', returnData.checkin);
			bodyFormData.append('endDate', returnData.checkout);
			bodyFormData.append('guests', returnData.guests);
			// console.log(bodyFormData);
		}
		if (searchParams.has('success')) {
			let updateDates = [];
			for (const day in returnData.dates) {
				const update = { date: returnData.dates[day], available: false };
				updateDates.push(update);
			}
			// console.log(updateDates);

			const options = {
				method: 'PUT',
				url: 'https://api.hospitable.com/calendar/964614',
				headers: {
					accept: 'application/json',
					'content-type': 'application/json',
					authorization: `Bearer ${props.token}`,
				},
				data: updateDates,
			};

			// **********************FOR TESTING**********************
			// googleScripts(bodyFormData);

			axios
				.request(options)
				.then((response) => {
					googleScripts(bodyFormData);
				})
				.catch((error) => {
					console.error(error);
					setDatesReservedError(true);
					bodyFormData.append(
						'ERROR',
						'DATES NOT RESERVED WITH HOSPITABLE - ERROR IN PUT REQUEST. MANUAL RESERVATION REQUIRED. CHECK FOR DUPLICATE RESERVATIONS.'
					);
					googleScripts(bodyFormData);
				});
		}
	}, []);

	useEffect(() => {
		if (emailsSent || emailsSentError) setLoading(false);
	}, [emailsSent, emailsSentError]);

	return (
		<div className={Style.Page}>
			{loading ? (
				<div className={Style.LoadingSpinner}>
					<LoadingSpinner />
					<p>Processing...</p>
				</div>
			) : (
				<div className={Style.Confirm}>
					<div className={Style.Header}>
						<Link to='/'>
							<div className={Style.Arrow}>
								<BsArrowLeft />
							</div>
						</Link>
						{confirmed ? (
							<h1>
								Booking Confirmed{' '}
								<span className={Style.ConfirmedCheck}>
									<BsCheck2Circle />
								</span>
							</h1>
						) : (
							<h1>
								Booking Requested{' '}
								<span className={Style.ConfirmedCheck}>
									<BsCheck2Circle />
								</span>
							</h1>
						)}
					</div>
					<div className={Style.Left}>
						<section>
							{!datesReservedError ? (
								<h4>You're all set! You will recieve an email shortly with your booking details.</h4>
							) : (
								<h4>
									Payment was successful. You will recieve an email when your booking is confirmed.
								</h4>
							)}
							{!emailsSentError ? (
								''
							) : (
								<h4>
									There may have been an error saving your booking. If you do not recieve an email
									within 5 minutes, please contact us.
								</h4>
							)}
						</section>
						<section>
							<h2>Your Trip</h2>
							<div className={Style.SubSection}>
								<div className={Style.Info}>
									<div className={Style.Info1}>Dates</div>
									<div className={Style.Info2}>
										<div>
											Check in:{' '}
											<span
												style={{
													fontWeight: 500,
													color: '#52758a',
												}}>
												{checkin}
											</span>
										</div>
										<div>
											Check out:{' '}
											<span
												style={{
													fontWeight: 500,
													color: '#52758a',
												}}>
												{checkout}
											</span>
										</div>
									</div>
								</div>
							</div>
							<div className={Style.SubSection}>
								<div className={Style.Info}>
									<div className={Style.Info1}>Guests</div>
									<div className={Style.Info2}>{`${guests} guest${guests > 1 ? 's' : ''}`}</div>
								</div>
							</div>
							<div className={Style.SubSection}>
								<div className={Style.Info}>
									<div className={Style.Info1}>Pets</div>
									<div className={Style.Info2}>{props.pets ? 'Yes' : 'No'}</div>
								</div>
							</div>
						</section>
						<section>
							<h2>Cancellation Policy</h2>
							<div className={Style.SubSection}>
								<h4>
									{format(new Date(returnData.dates[0]), 'yyyy-MM-dd') >
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
									{format(new Date(returnData.dates[0]), 'yyyy-MM-dd') >
									format(add(new Date(), { days: 7 }), 'yyyy-MM-dd') ? (
										<>
											<p>
												Cancel by{' '}
												{format(
													sub(new Date(returnData.dates[0]), {
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
							</div>
						</section>
						<section>
							<h2>Contact Information</h2>
							<h4>{`${firstName} ${lastName}`}</h4>
							<h4>{phone}</h4>
							<h4>{email}</h4>
						</section>
					</div>
					<div className={Style.Right}>
						<section className={Style.Price}>
							<div className={Style.Overview}>
								<div className={Style.Image} style={{ backgroundImage: `url(${LR3sm.url})` }}></div>
								<h4>Exquisite Boho 4BR/3.5BA - Steps from Mt Tabor Park</h4>
							</div>
							<div className={Style.SubSection}>
								<h2>Payment Details</h2>
								<div className={Style.PriceDetails}>
									<div className={Style.Detail}>
										<div>{`$${avgPrice} x ${dates.length} night${
											dates.length > 1 ? 's' : ''
										}`}</div>
										<div>{`$${price}`}</div>
									</div>
									<div className={Style.Detail}>
										<div>Cleaning Fee</div>
										<div>$185</div>
									</div>
									<div className={Style.Detail}>
										<div>Taxes</div>
										<div>{`$${taxes}`}</div>
									</div>
									<div className={Style.Total}>
										<div>Amount Paid (USD)</div>
										<div>{`$${amtPaid}`}</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			)}
		</div>
	);
}

export default Confirm;
