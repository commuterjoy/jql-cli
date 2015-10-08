A minimal Jira CLI.

Install it,

```
npm -g jql-cli
```

Configure it,

```
jql auth -u <username> -p <password> -h <hostname>
```

List some issues by created date or priorty

```
jql ls --project NFT --created
jql ls --project NFT --priority
```

Create a new issue,

```
jql create --project NFT --important --summary 'Something broke'
```

Create a new issues with a description from stdin,

```
jql create -p NFT -P 1 --summary 'Uh-oh' < pbpaste 
```

Open an issue (in your web browser),

```
jql open NFT-123
```

Close an issue,

```
jql close NFT-123
```
