const openurl = require('openurl');

module.exports = function (issue) {
	openurl.open('https://jira.ft.com/browse/' + issue);
}
