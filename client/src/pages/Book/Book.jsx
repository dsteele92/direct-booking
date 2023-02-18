import Style from './book.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { add, format } from 'date-fns';
import { keys } from '../../api_keys.js';
import { BsArrowLeft } from 'react-icons/bs';
import { LR3sm } from 'images';

function Book(startDate, endDate, guests, disabledDates, setStartDate, setEndDate, setGuests) {
	const [openDatePicker, setOpenDatePicker] = useState(false);

	return (
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
							<div className={Style.Info2}>---DATES---</div>
						</div>
						<div className={Style.Edit}>Edit</div>
					</div>
					<div className={Style.SubSection}>
						<div className={Style.Info}>
							<div className={Style.Info1}>Time</div>
							<div className={Style.Info2}>---CHECKIN TIME---</div>
						</div>
						<div className={Style.Edit}>Edit</div>
					</div>
					<div className={Style.SubSection}>
						<div className={Style.Info}>
							<div className={Style.Info1}>Guests</div>
							<div className={Style.Info2}>---GUESTS---</div>
						</div>
						<div className={Style.Edit}>Edit</div>
					</div>
				</section>
				<section>
					<h2>Cancellation Policy</h2>
					<div className={Style.SubSection}>
						<p>
							Cancel before check-in on ---DATE + 48hours--- for a partial refund. After that, this
							reservation is non-refundable
						</p>
					</div>
				</section>
				<section>
					<h2>Contact Information</h2>
					<div className={Style.SubSection}>---FORM---</div>
				</section>
			</div>
			<div className={Style.Right}>
				<section className={Style.Price}>
					<div className={Style.Overview}>
						{/* <img src={`url(${LR3sm.url})`} alt='living room' /> */}
						<div className={Style.Image} style={{ backgroundImage: `url(${LR3sm.url})` }}></div>
						<h4>Exquisite Boho 4BR/3.5BA - Steps from Mt Tabor Park</h4>
					</div>
					<div className={Style.SubSection}>
						<h2>Price Details</h2>
						<div className={Style.PriceDetails}>
							<div className={Style.Detail}>
								<div>Item</div>
								<div>$</div>
							</div>
							<div className={Style.Detail}>
								<div>Item</div>
								<div>$</div>
							</div>
							<div className={Style.Detail}>
								<div>Item</div>
								<div>$</div>
							</div>
							<div className={Style.Total}>
								<div>Total(USD)</div>
								<div>$</div>
							</div>
						</div>
					</div>
				</section>
			</div>
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
