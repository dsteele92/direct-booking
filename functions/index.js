const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({ origin: true });

require('dotenv').config();
// **************** Remove process.env and add keys before deploying functions **************** //

const stripe = require('stripe')('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');
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
			client_id: '9b0ed7be-86ed-4e75-9ac5-968d63a00d5b'
			client_secret: '6loEG6zh8dFw0q46uMtzwo7F3AOK7lGYGA27lASU',
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
		maps_key: 'AIzaSyBKKYbyIFZ1Ok1PNYc8S4Dil9tA2xDli-g',
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
	const lastBookedDate = dates[dates.length - 1];
	const pets = url_data.pets;
	let data;

	const options = {
		method: 'GET',
		url: 'https://api.hospitable.com/calendar/964614',
		params: {
			start_date: startDate,
			end_date: lastBookedDate,
		},
		headers: {
			accept: 'application/json',
			Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YTYyNGRmMC0xMmYxLTQ0OGUtYjg4NC00MzY3ODBhNWQzY2QiLCJqdGkiOiI3OGI2ODlhMmY5M2M3OWQ1ZmRjOTM0MmRiNmEyMWQ3OTliNzkxMDY2Nzc2ZmU2NmFjNTJmMGFlNWY0NmE5YjUyYjg2ZjFlNWUzZTg0OWY2NCIsImlhdCI6MTcwNDY3NTM5MC44NTU5MTksIm5iZiI6MTcwNDY3NTM5MC44NTU5MjIsImV4cCI6MTczNjI5Nzc5MC44NTE3NzYsInN1YiI6IjE4NTY5NCIsInNjb3BlcyI6WyJwYXQ6cmVhZCIsInBhdDp3cml0ZSJdfQ.dleZC7sJIKU34LtsyjbU1QZ-hQ-QCvmNBg_YqJnHAu2bzGbY5W_Esub6oTIcPpC27eHwgdztiPddWcFPBjoElaxJaFwQvTgkg_Y6xzrkwrr5wYAvQSkOu5Awyj56kQt9MX2rpEs2FMTD09EghdBZMhE2oFOAbLp7OrzchugQHZbJGuHw4BhzygfNUP9OWEKGDfLG4WhaSjJvzCwttRdVvVouyYV1lse8A3OJMGyJLDF2KWIocRSqslXy8mBKhUozxurTE-fu4FUuuArCwLgB1TnBQAwuqb4Cw1UcWWbZQbOjan_XTx21o_L_jLe-frTI5gzPi4SuJuhEgDyxIc9SIIxsyBwsfCa297a5-igEaBASsFjpTG1JgZsEvtS9nExiJbOAT0FI1NXbMCiQ87hYHZkS0E6n52fqol7ZmaKVIvrsE-hnP4hFF-rmuGkgPPyyoqPfUZI-aMBqJWZTl8hkkpbCDOVT8Ge2vHKZsRfZEeM0vNES2zxBGpKxvP-wo_xEcI7mvpSvb6BvAg2GwhvphUNU3v95cxITmBk8cVVSazhb_SWiXXTmZuVHKCO30MsVdsJzHc-2qz-f8zu6Paar3afHrW4dL93ypQJHHRfDQEdGlaDJnIBa4o3go9UHDmGdeCC_1ULjAyDVMrgrxSujL_ccC5cTQa53oPjfLcBvPEg`,
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
	if (pets > 0) {
		price += 15000;
	}
	for (day in data) {
		if (!data[day].status.available) {
			res.json({ url: `https://portlandbnb.org/book?data=${req.body.url_data}&datesError=true` });
			return;
		}
		price += data[day].price.amount;
	}
	const taxes = price * 0.155 + dates.length * 400;
	price += taxes;
	price = Math.round(price);

	const pmnt = {
		total: (price / 100).toFixed(2),
		price: ((price - 18500 - taxes) / 100).toFixed(),
		avgPrice: ((price - 18500 - taxes) / dates.length / 100).toFixed(),
		taxes: (taxes / 100).toFixed(),
	};

	const paymentData = Buffer.from(JSON.stringify(pmnt)).toString('base64');

	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: 'usd',
					product_data: { name: `Tabor B&B: ${url_data.checkin} - ${url_data.checkout}` },
					unit_amount: price,
					tax_behavior: 'inclusive',
				},
				quantity: 1,
			},
		],
		mode: 'payment',
		success_url: `https://portlandbnb.org/confirm?success=true&data=${req.body.url_data}&payment=${paymentData}`,
		cancel_url: `https://portlandbnb.org/book?canceled=true&data=${req.body.url_data}`,
		// success_url: `http://localhost:3000/confirm?success=true&data=${req.body.url_data}&payment=${paymentData}`,
		// cancel_url: `http://localhost:3000/book?canceled=true&data=${req.body.url_data}`,

		// for testing success page:
		// cancel_url: `http://localhost:3000/confirm?success=true&data=${req.body.url_data}&payment=${paymentData}`,
	});
	res.json({ url: session.url });
});

exports.api = functions.https.onRequest(app);

app.listen(10000, () => console.log('Running on port 10000'));
