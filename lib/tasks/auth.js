
const fs = require('fs');

const generate = function (user, pass) {
	return new Buffer(user + ":" + pass).toString("base64");
}

module.exports = function (opts) {
	
	const path = process.env.HOME + '/.jira'
	const o = opts ? opts : {};	

	if (o.username) {
		fs.writeFileSync(path, JSON.stringify({ 
			token: generate(o.username, o.password),
			host: o.host
		
		}), { encoding: 'utf8' });
	} else {
		return JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }));
	}
};
