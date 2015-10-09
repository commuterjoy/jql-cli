
import fetch from 'node-fetch';
import moment from 'moment';
import tasks from '../tasks';

const err = e => console.error(e);

module.exports = (issue, opts) => {

	const auth = tasks.auth();

	return fetch(auth.host + 'rest/api/2/issue/' + issue + '/comment', {
		method: 'POST',
		body: JSON.stringify({ body: opts.message }),
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
	.then(body => console.log('Logged a comment against ' + issue))
	.catch(err);

}
