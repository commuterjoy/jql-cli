
import tasks from '../tasks';
import openurl from 'openurl';

const auth = tasks.auth();

module.exports = issue => {
	let url = `${auth.host}/browse/${issue}`;
	console.log(`Opening ${url}`)
	openurl.open(url);
}
