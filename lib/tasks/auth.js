
const fs = require('fs');

const generate = (user, pass) => {
	return new Buffer(user + ":" + pass).toString("base64");
}

module.exports = function (opts) {
	
	const path = process.env.HOME + '/.jirxa'
	const o = opts ? opts : {};	

	if (o.username && o.password && o.host) {
		fs.writeFileSync(path, JSON.stringify({ 
			token: generate(o.username, o.password),
			host: o.host
		
		}), { encoding: 'utf8' });
	} else {
		try {
			fs.accessSync(path);
			return JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }));
		}
		catch (e) {
			console.error('No auth set up - run `jql auth -u name -p password -h https://jira.foo.com/`');
			process.exit(1);
		}
	}
};
