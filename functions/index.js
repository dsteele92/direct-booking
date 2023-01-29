const functions = require('firebase-functions');
const axios = require('axios');

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.getListings = functions.https.onRequest(async (request, response) => {
	const options = {
		method: 'GET',
		url: 'https://api.hospitable.com/listings',
		params: { page: '1', per_page: '10' },
		headers: {
			accept: 'application/json',
			authorization: `Bearer ${process.env.HOSPITABLE_KEY}`,
			'Content-Type': 'application/vnd.hospitable.20190904+json',
		},
	};

	// const api = async () => {
	// 	await axios.request(options);
	// .then(function (response) {
	// 	// console.log(response.data);
	// 	return response;
	// })
	// .catch(function (error) {
	// 	// console.error(error);
	// 	return error;
	// });
	// };

	functions.logger.info('Hello logs!', { structuredData: true });
	// functions.logger.info(process.env.GOOGLE_MAPS_KEY);
	functions.logger.info(process.env.HOSPITABLE_KEY);
	const res = await axios.request(options);
	functions.logger.info(res);
	response.json(res);
	// response.send('Hello from Firebase!');
});
