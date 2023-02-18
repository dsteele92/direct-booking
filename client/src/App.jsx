import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { add, format } from 'date-fns';
import { Home, Book } from 'pages';

const App = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [guests, setGuests] = useState(1);
	const [disabledDates, setDisabledDates] = useState([add(new Date(), { days: 1 }), add(new Date(), { days: 3 })]);

	useEffect(() => {
		console.log('Page loaded');
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
