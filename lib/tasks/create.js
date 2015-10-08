
import fetch from 'node-fetch';
import moment from 'moment';
import tasks from '../tasks';

const err = e => console.error(e);

module.exports = opts => {

	const auth = tasks.auth();

	const issue = {
		fields: {
			summary: opts.summary,
			description: opts.description,
			priority: { id: (opts.important) ? '1' : '4' },	// FIXME configure per project 
			issuetype: { id: 1 },	// FIXME configure per project
			project: { key: opts.project }
		}
	};

	return fetch(auth.host + 'rest/api/2/issue/', {
		method: 'POST',
		body: JSON.stringify(issue),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + auth.token 
		}
	}).then(res => {
		if (!res.ok) {
			return res.text().then(t => { 
				console.log(t);
				process.exit(1)
			});
		}
		return res.json();
	})
	.then(body => console.log('Created new issue ' + body.key))
	.catch(err);

}
