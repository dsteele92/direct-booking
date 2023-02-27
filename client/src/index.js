import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';
import App from './App';

axios
	.get('https://us-central1-tabor-bnb.cloudfunctions.net/getToken')
	.then((response) => {
		const root = ReactDOM.createRoot(document.getElementById('root'));
		root.render(<App token={response.data.token} />);
	})
	.catch((err) => {
		const root = ReactDOM.createRoot(document.getElementById('root'));
		root.render(<App token={''} />);
	});
