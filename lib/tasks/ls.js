
const fetch = require('node-fetch');
const moment = require('moment');
const columnify = require('columnify')
const tasks = require('../tasks');

module.exports = function (opts) {

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

		const jql = conditions.join(' AND ') + ((order.length > 0) ? ' ORDER BY ' + order.join(',') : '');

		console.log('Running query: ' + jql, auth);

		fetch(auth.host + '/rest/api/2/search?maxResults=100&jql=' + encodeURI(jql), {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + auth.token 
			}
		}).then(function(res) {
			console.log(res.status)
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

		}).catch(function (e) { console.log(e) });

}
