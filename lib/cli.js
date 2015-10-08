
import program from 'commander';
import tasks from '../lib/tasks';

const stdin = process.stdin;

program
	.command('create')
	.option('-p, --project [project]', 'Project')
	.option('-s, --summary [summary]', 'Summary')
	.option('-d, --summary [description]', 'Description')
	.option('-i, --important', 'Priority important')
	.parse(process.argv)
	.action(options => {
		
		// Assign stdin to the description
		new Promise((resolve, reject) => {
			
			let r = '';
			
			if (stdin.isTTY) {
				resolve(r);
			}

			stdin.setEncoding('utf8');
			stdin.on('readable', () => {
				var chunk;
				while ((chunk = stdin.read())) {
					r += chunk;
				}
			});

			stdin.on('end', () => {
				resolve(r);
			});

		})
		.then(d => {
			options.description = (d) ? d : undefined;
			tasks.create(options).then(t => process.exit(0));
		})
		.catch(e => console.error(e))

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
