
import program from 'commander';
import tasks from '../lib/tasks';

program
	.command('create')
	.option('-p, --project [project]', 'project')
	.option('-s, --summary [summary]', 'Summary')
	.option('-d, --summary [description]', 'Description')
	.option('-i, --important', 'Priority important')
	.parse(process.argv)
	.action(options => {
		tasks.create(options);
	});

program
	.command('ls')
	.option('-p, --project [project]', 'project')
	.option('-c, --created', 'sort by created')
	.option('-P, --priority', 'sort by priority')
	.option('-f, --filter [filter]', 'filter by the given string')
	.parse(process.argv)
	.action(options => {
		tasks.ls(options);
	});

program
	.command('auth')
	.option('-u, --username [username]', 'your jira username')
	.option('-p, --password [password]', 'your jira password')
	.option('-h, --host [host]', 'your jira host name - Eg, https://jira.foo.com/')
	.parse(process.argv)
	.action(options => {
		tasks.auth(options);
	});

program
	.command('show [issue]')
	.parse(process.argv)
	.action((issue, options) => {
		tasks.open(issue);
	});

program.parse(process.argv);
