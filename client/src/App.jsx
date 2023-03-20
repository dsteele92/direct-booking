import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { add, format, parseISO } from 'date-fns';
import { Home, Book, Confirm } from 'pages';
import { keys } from './keys.js';

const App = (props) => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [guests, setGuests] = useState(1);
	const [disabledDates, setDisabledDates] = useState([]);
	const [disabledCheckoutDates, setDisabledCheckoutDates] = useState([]);
	const [availableData, setAvailableData] = useState({});
	const [dates, setDates] = useState([]);

	useEffect(() => {
		const options = {
			method: 'GET',
			url: `https://api.hospitable.com/calendar/${keys.HOSPITABLE_PROPERTY_ID}`,
			params: {
				start_date: format(new Date(), 'yyyy-MM-dd'),
				end_date: format(add(new Date(), { months: 6 }), 'yyyy-MM-dd'),
			},
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${props.token}`,
				'Content-Type': 'application/vnd.hospitable.20230314+json',
			},
		};

		axios
			.request(options)
			.then((response) => {
				const data = response.data.data.days;
				// console.log(data);
				let unavailable = [];
				let unavailableCheckout = [];
				let checkoutPossible = false;
				let available = {};
				for (const day in data) {
					const parsed = parseISO(data[day].date);
					if (data[day].status.available) {
						if (!checkoutPossible) {
							checkoutPossible = true;
						}
						available[data[day].date] = {
							price: data[day].price.amount,
							min_stay: data[day].min_stay,
						};
					} else if (!data[day].status.available) {
						unavailable.push(parsed);
						if (checkoutPossible) {
							checkoutPossible = false;
						} else {
							unavailableCheckout.push(parsed);
						}
					}
				}
				setDisabledDates(unavailable);
				setDisabledCheckoutDates(unavailableCheckout);
				setAvailableData(available);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [props.token]);

	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							<Home
								startDate={startDate}
								setStartDate={(i) => setStartDate(i)}
								endDate={endDate}
								setEndDate={(i) => setEndDate(i)}
								dates={dates}
								setDates={(i) => setDates(i)}
								guests={guests}
								setGuests={(i) => setGuests(i)}
								disabledDates={disabledDates}
								disabledCheckoutDates={disabledCheckoutDates}
								availableData={availableData}
							/>
						}
					/>
					<Route
						path='/book'
						element={
							<Book
								startDate={startDate}
								setStartDate={(i) => setStartDate(i)}
								endDate={endDate}
								setEndDate={(i) => setEndDate(i)}
								dates={dates}
								setDates={(i) => setDates(i)}
								guests={guests}
								setGuests={(i) => setGuests(i)}
								disabledDates={disabledDates}
								disabledCheckoutDates={disabledCheckoutDates}
								availableData={availableData}
								token={props.token}
							/>
						}
					/>
					<Route
						path='/book'
						element={
							<Book
								startDate={startDate}
								setStartDate={(i) => setStartDate(i)}
								endDate={endDate}
								setEndDate={(i) => setEndDate(i)}
								dates={dates}
								setDates={(i) => setDates(i)}
								guests={guests}
								setGuests={(i) => setGuests(i)}
								disabledDates={disabledDates}
								disabledCheckoutDates={disabledCheckoutDates}
								availableData={availableData}
								token={props.token}
							/>
						}
					/>
					<Route path='/confirm' element={<Confirm token={props.token} />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
