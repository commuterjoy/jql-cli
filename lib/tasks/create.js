
const fetch = require('node-fetch');
const moment = require('moment');
const columnify = require('columnify')
const tasks = require('../tasks');

module.exports = function (opts) {

	const auth = tasks.auth();

	const issue = {
		fields: {
			summary: opts.summary,
			description: opts.description,
			priority: { id: (opts.important) ? '1' : '4' },	// minor major
			issuetype: { id: 1 },
			project: { key: opts.project }
		}
	};

	fetch('https://jira.ft.com/rest/api/2/issue/', {
		method: 'POST',
		body: JSON.stringify(issue),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + auth 
		}
	}).then(function(res) {
		return res.json();
	}).then(function(body) {
		console.log('Created new issue ' + body.key);
	});

}
