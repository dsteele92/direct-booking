import Style from './confirm.module.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from 'components';
import { Link, useSearchParams } from 'react-router-dom';
import { add, format, parseISO, sub } from 'date-fns';
import { BsArrowLeft, BsPeopleFill, BsCheck2Circle } from 'react-icons/bs';
import { AiFillCloseCircle, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { LR3sm } from 'images';
import { keys } from '../../keys.js';

function Confirm(props) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [avgPrice, setAvgPrice] = useState(0);
	const [price, setPrice] = useState(0);
	const [amtPaid, setAmtPaid] = useState(0);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('+1');
	const [displayDates, setDisplayDates] = useState('');
	const [dates, setDates] = useState([]);
	const [guests, setGuests] = useState(1);
	// set this to true when publishing ---------------------->
	const [loading, setLoading] = useState(false);
	// ------------------------------------------------------->
	const [confirmed, setConfirmed] = useState(true);
	// const [submitted, setSubmitted] = useState(true);

	let paymentData;
	let returnData;

	if (searchParams.has('payment')) {
		paymentData = JSON.parse(atob(searchParams.get('payment')));
	}
	if (searchParams.has('data')) {
		returnData = JSON.parse(atob(searchParams.get('data')));
	}

	useEffect(() => {
		if (searchParams.has('payment')) {
			setAmtPaid(paymentData.total);
			setAvgPrice(paymentData.avgPrice);
			setPrice(paymentData.price);
		}
		if (searchParams.has('data')) {
			setFirstName(returnData.client.firstName);
			setLastName(returnData.client.lastName);
			setEmail(returnData.client.email);
			setPhone(returnData.client.phone);
			setDates(returnData.dates);
			setDisplayDates(returnData.displayDates);
			setGuests(returnData.guests);

			const bodyFormData = new FormData();
			bodyFormData.append('firstName', returnData.client.firstName);
			bodyFormData.append('lastName', returnData.client.lastName);
			bodyFormData.append('email', returnData.client.email);
			bodyFormData.append('phone', returnData.client.phone);
			bodyFormData.append('startDate', returnData.dates[0]);
			bodyFormData.append('endDate', returnData.dates[returnData.dates.length - 1]);
			bodyFormData.append('guests', returnData.guests);

			// console.log(bodyFormData);

			axios({
				method: 'post',
				url: 'https://script.google.com/macros/s/AKfycbzTMI6Ry4c7hjBf6OPHrV1O0upKutpV02brRy87jWSfYfOiWz8cK5tIByvrDVJ1JRKM/exec',
				data: bodyFormData,
				headers: { 'Content-Type': 'multipart/form-data' },
			})
				.then(function (response) {
					console.log(response);
				})
				.catch(function (response) {
					console.log(response);
				});
		}
	}, []);

	useEffect(() => {
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
			// axios
			// .request(options)
			// .then((response) => {
			// setConfirmed(true);
			// setLoading(false);
			// })
			// .catch((error) => {
			// 	console.error(error);
			// setConfirmed(false);
			// 	setLoading(false);
			// });
		}
	}, []);

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
							{confirmed ? (
								<h4>You're all set! You will recieve an email shortly with your booking details.</h4>
							) : (
								<h4>
									Payment was successful. You will recieve an email when your booking is confirmed.
								</h4>
							)}
						</section>
						<section>
							<h2>Your Trip</h2>
							<div className={Style.SubSection}>
								<div className={Style.Info}>
									<div className={Style.Info1}>Dates</div>
									<div className={Style.Info2}>{displayDates}</div>
								</div>
							</div>
							<div className={Style.SubSection}>
								<div className={Style.Info}>
									<div className={Style.Info1}>Guests</div>
									<div className={Style.Info2}>{`${guests} guest${guests > 1 ? 's' : ''}`}</div>
								</div>
							</div>
						</section>
						<section>
							<h2>Cancellation Policy</h2>
							<div className={Style.SubSection}>
								<h4>
									{`Cancel before check-in on ${format(
										sub(new Date(returnData.dates[0]), {
											days: 2,
										}),
										'MMMM dd, yyyy'
									)} for a full refund. After that,
								this reservation is non-refundable`}
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
