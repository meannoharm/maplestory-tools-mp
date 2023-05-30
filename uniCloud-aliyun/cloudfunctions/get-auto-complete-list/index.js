"use strict";
const https = require('https');

const request = (url) => new Promise((resolve, reject) => {
	https.get(url, (res) => {
		let data = '';
		// called when a data chunk is received.
		res.on('data', (chunk) => {
			data += chunk;
		});
		// called when the complete response is received.
		res.on('end', () => {
			resolve(JSON.parse(data));
		});
	}).on("error", (err) => {
		reject(err);
	});
})

exports.main = async (event, context) => {
	const {
		input,
		region = 'gms'
	} = event;

	if (!input) {
		return {
			errCode: 1,
			errMsg: 'input is required',
		};
	}

	try {
		const data = await request(
			`https://api.maplestory.gg/v1/public/autocomplete/${input}/${region}`
		);
		return {
			errorCode: 0,
			errMsg: "",
			data,
		};
	} catch (error) {
		return {
			errCode: 1,
			errMsg: error,
		};
	}
};