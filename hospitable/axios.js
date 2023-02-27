const axios = require('axios');

axios.get('https://us-central1-tabor-bnb.cloudfunctions.net/getToken').then((response) => {
	console.log(response);
});
