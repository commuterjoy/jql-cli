A minimal Jira CLI.

Install it,

```
npm -g jql-cli
```

Configure it,

```
jql auth -u <username> -p <password> -h <hostname>
```

List some issues by created date,

```
jql ls --project NFT --created
```

... or priority,

```
jql ls --project NFT --priority
```

Ad-hoc [JQL](https://confluence.atlassian.com/jira/advanced-searching-179442050.html) query,

```
jql ls -q 'resolution = Unresolved AND assignee in (currentUser()) ORDER BY priority DESC'
```

Create a new issue,

```
jql create --project NFT --important --summary 'Something broke'
```

Create a new issues with a description from stdin,

```
jql create -p NFT -s 'Uh-oh' < foo.txt 
```

Coment on an issue,

```
jql comment NFT-123 -m "do I not like this"
```

Open an issue (in your web browser),

```
jql show NFT-123
```

Obviously this integrates nicely with all the other shell tools,

Eg, Everything that's assigned to **me**,

`alias me='jql ls -q "assignee = currentUser()"'`

Eg, Top ten issues, 

`jql ls -p NFT --priority | head -n 10`

Eg, Everything marked critical created this week,

`alias p1='jql ls -q "priority = Critical AND createdDate > startOfWeek()"'`

Eg, Create a issue for every error in your logs ;) 

`tail -f logs | grep 'error' | xargs -I % jql create -p NFT -s %`

## to-do

- Close an issue, Eg. `jql close NFT-123`
- Append a comment to an issue, Eg. `jql comment NFT-123 -m "this is a comment"`

