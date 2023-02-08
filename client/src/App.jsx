import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import './App.scss';

import { Home, Book } from 'pages';

const App = () => {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/book' element={<Book />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
