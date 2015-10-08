
const fetch = require('node-fetch');
const moment = require('moment');
const columnify = require('columnify')

module.exports = function (opts) {

	// FIXME - stash locally
	const auth = new Buffer(process.env.ad_user + ":" + process.env.ad_password).toString("base64");

	const issue = process.argv[2];  

	console.log(issue);

	fetch('https://jira.ft.com/rest/api/2/issue/' + issue, {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + auth 
		}
	}).then(function(res) {
		console.log(res.status);
		return res.json();
	}).then(function(body) {
		console.log(body);
	});
}
