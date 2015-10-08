
import program from 'commander';
import tasks from '../lib/tasks';

program
	.command('create')
	.option('-p, --project [project]', 'Project')
	.option('-s, --summary [summary]', 'Summary')
	.option('-d, --summary [description]', 'Description')
	.option('-i, --important', 'Priority important')
	.parse(process.argv)
	.action(options => {
		tasks.create(options);
	});

program
	.command('ls')
	.option('-p, --project [project]', 'Project')
	.option('-c, --created', 'Sort by created')
	.option('-P, --priority', 'Sort by priority')
	.option('-f, --filter [filter]', 'Filter by the given string')
	.option('-q, --query [filter]', 'Send a JQL query to Jira (overrides all other options)')
	.parse(process.argv)
	.action(options => {
		tasks.ls(options);
	});

program
	.command('auth')
	.option('-u, --username [username]', 'Your jira username')
	.option('-p, --password [password]', 'Your jira password')
	.option('-h, --host [host]', 'Your Jira host name - Eg, https://jira.foo.com/')
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
