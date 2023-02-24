import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { add, format, parseISO } from 'date-fns';
import { Home, Book } from 'pages';
import { keys } from './api_keys.js';

const App = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [guests, setGuests] = useState(1);
	const [disabledDates, setDisabledDates] = useState([]);
	const [data, setData] = useState({});

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
				Authorization: `Bearer ${keys.HOSPITABLE_CURRENT_TOKEN}`,
				'Content-Type': 'application/vnd.hospitable.20190904+json',
			},
		};

		axios
			.request(options)
			.then(function (response) {
				console.log(response);
				const data = response.data.data.days;
				console.log(data);
				let unavailable = [];
				for (const day in data) {
					if (!data[day].status.available) {
						const parsed = parseISO(data[day].date);
						console.log(parsed);
						unavailable.push(parsed);
					}
					// console.log(`date: ${data[day].date}`);
					// console.log(`status: ${data[day].status.available}`);
					// console.log(`price: ${data[day].price.amount}`);
				}
				console.log(unavailable);
				setDisabledDates(unavailable);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, []);

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
								guests={guests}
								setGuests={(i) => setGuests(i)}
								disabledDates={disabledDates}
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
								guests={guests}
								setGuests={(i) => setGuests(i)}
								disabledDates={disabledDates}
							/>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
