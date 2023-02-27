const functions = require('firebase-functions');

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//

//import libraries
// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
// import * as express from 'express';
// import * as bodyParser from 'body-parser';
const axios = require('axios');
const cors = require('cors')({ origin: true });

exports.getToken = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		axios
			.post(
				'https://auth.hospitable.com/oauth/token',
				{
					client_id: '',
					client_secret: '',
					audience: 'api.hospitable.com',
					grant_type: 'client_credentials',
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then((response) => {
				console.log(response);
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
});

//initialize firebase inorder to access its services
// admin.initializeApp(functions.config().firebase);

//initialize express server
// const hospitable = express();
// const main = express();

//add the path to receive request and set json as bodyParser to process the body
// main.use('https://auth.hospitable.com', hospitable);
// main.use(bodyParser.json());
// main.use(bodyParser.urlencoded({ extended: false }));

//initialize the database and the collection
// const db = admin.firestore();
// const userCollection = 'users';

//define google cloud function name
// export const webApi = functions.https.onRequest(main);

// exports.getListings = functions.https.onRequest(async (request, response) => {
// 	const options = {
// 		method: 'GET',
// 		url: 'https://api.hospitable.com/listings',
// 		params: { page: '1', per_page: '10' },
// 		headers: {
// 			accept: 'application/json',
// 			authorization: `Bearer ${process.env.HOSPITABLE_KEY}`,
// 			'Content-Type': 'application/vnd.hospitable.20190904+json',
// 		},
// 	};

// 	functions.logger.info('Hello logs!', { structuredData: true });
// 	// functions.logger.info(process.env.GOOGLE_MAPS_KEY);
// 	functions.logger.info(process.env.HOSPITABLE_KEY);
// 	const res = await axios.request(options);
// 	functions.logger.info(res);
// 	response.json(res);
// 	// response.send('Hello from Firebase!');
// });
