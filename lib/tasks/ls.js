
import fetch from 'node-fetch';
import moment from 'moment';
import tasks from '../tasks';
import columnify from 'columnify';

const err = e => console.error(e);

module.exports = opts => {

		const auth = tasks.auth();
			
		const conditions = [];
		const order = [];

		if (opts.project) {
			conditions.push('project = ' + opts.project)
		}
		
		if (opts.filter) {
			conditions.push('text ~ ' + opts.filter)
		}

		if (opts.resolution) {
			conditions.push('resolution = ' + opts.resolution);
		} else {
			conditions.push('resolution = Unresolved');
		}
		
		if (opts.created) {
			order.push('created DESC');
		}
		
		if (opts.priority) {
			order.push('priority DESC');
		}

		const jql = (opts.query) ? opts.query : conditions.join(' AND ') + ((order.length > 0) ? ' ORDER BY ' + order.join(',') : '');

		console.log('Running query: ' + jql, auth);

		fetch(auth.host + '/rest/api/2/search?maxResults=100&jql=' + encodeURI(jql), {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + auth.token 
			}
		}).then(function(res) {
			if (!res.ok) {
				return res.text().then(t => { 
					console.log(t);
					process.exit(1)
				});
			}
			return res.json();
		}).then(function(body) {
		
			const m = body.issues.map(function(issue) {
				return {
					priority: issue.fields.priority.name,
					issue: issue.key,
					summary: issue.fields.summary,
					created: moment.duration(new Date(issue.fields.created) - new Date()).humanize(true),
					who: issue.fields.creator.name
				};
			})

			console.log(columnify(m));

		}).catch(err);

}
