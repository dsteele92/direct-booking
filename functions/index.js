const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({ origin: true });

require('dotenv').config();
// **************** Remove process.env and add keys before deploying functions **************** //

const stripe = require('stripe')(process.env.STRIPE_KEY);
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Buffer = require('buffer').Buffer;
app.use(express.static('public'));
app.use(cors);
app.use(bodyParser.json());

const getToken = () => {
	return axios.post(
		'https://auth.hospitable.com/oauth/token',
		{
			client_id: process.env.HOSPITABLE_CLIENT_ID,
			client_secret: process.env.HOSPITABLE_CLIENT_SECRET,
			audience: 'api.hospitable.com',
			grant_type: 'client_credentials',
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
};

app.get('/', async (req, res) => {
	res.send('Hello');
});

app.get('/get-google-maps-key', (req, res) => {
	res.json({
		maps_key: process.env.GOOGLE_MAPS_KEY,
	});
});

app.get('/get-hospitable-token', async (req, res) => {
	await getToken()
		.then((response) => {
			res.status(200).json({
				token: response.data.access_token,
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
});

app.post('/create-checkout-session', async (req, res) => {
	const url_buffer = Buffer.from(req.body.url_data, 'base64');
	const url_data = JSON.parse(url_buffer.toString('utf-8'));
	const dates = url_data.dates;
	const startDate = dates[0];
	const endDate = dates[dates.length - 1];
	let data;

	const options = {
		method: 'GET',
		url: 'https://api.hospitable.com/calendar/964614',
		params: {
			start_date: startDate,
			end_date: endDate,
		},
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${url_data.token}`,
			'Content-Type': 'application/vnd.hospitable.20230314+json',
		},
	};

	await axios
		.request(options)
		.then((response) => {
			data = response.data.data.days;
		})
		.catch((err) => console.log(err));

	let price = 18500;
	for (day in data) {
		if (!data[day].status.available) {
			res.json({ url: `https://tabor-bnb.web.app/book?data=${req.body.url_data}&datesError=true` });
			return;
		}
		price += data[day].price.amount;
	}

	const pmnt = {
		total: (price / 100).toFixed(2),
		price: ((price - 18500) / 100).toFixed(),
		avgPrice: ((price - 18500) / dates.length / 100).toFixed(),
	};

	const paymentData = Buffer.from(JSON.stringify(pmnt)).toString('base64');

	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: 'usd',
					product_data: { name: `Tabor B&B: ${url_data.displayDates}` },
					unit_amount: price,
					tax_behavior: 'inclusive',
				},
				quantity: 1,
			},
		],
		mode: 'payment',
		// success_url: `https://tabor-bnb.web.app/confirm?success=true&data=${req.body.url_data}&payment=${paymentData}`,
		// cancel_url: `https://tabor-bnb.web.app/book?canceled=true&data=${req.body.url_data}`,
		success_url: `http://localhost:3000/confirm?success=true&data=${req.body.url_data}&payment=${paymentData}`,
		// cancel_url: `http://localhost:3000/book?canceled=true&data=${req.body.url_data}`,

		// for testing success page:
		cancel_url: `http://localhost:3000/confirm?success=true&data=${req.body.url_data}&payment=${paymentData}`,
	});
	res.json({ url: session.url });
});

exports.api = functions.https.onRequest(app);

app.listen(10000, () => console.log('Running on port 10000'));
