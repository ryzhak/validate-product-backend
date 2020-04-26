# validate-product-backend

Simple API backend for landing page that initially validates a product idea. So basically you should create a landing page and use this API. You can use this API for multiple landing pages as each API method has a `project` param so you can distiguish projects in the DB.

## Use case
Imagine that you have a landing page which promotes a mobile app. There are 2 download buttons (google play and app store) and email subscription input. Using this API you can:
- track the number of visitors
- track the number of times a visitor clicked a download button
- collect user emails

All data is saved to a local json db file.

## How to install
1. Create a `config.json` file in the project root:
```
{
    "PORT": 3000
}
```

Params:
- **PORT**: default port at which server should run

2. run `npm install`
3. run `node server.js`

## API

### POST /signup

Creates a new user by email.

Params:
- **project(required)**: project name. Min length: 1.
- **email(required)**: user email. Should be a valid email.

Example request:
```
{
	"project": "mytestproject1",
	"email": "user1@gmail.com"
}
```

Example response:
```
Success
```

### POST /action

Creates a new action.

Params:
- **project(required)**: project name. Min length: 1.
- **action(required)**: action name. Min length: 1.

Example request:
```
{
	"project": "mytestproject1",
	"action": "CLICK_DOWNLOAD_GOOGLE_PLAY"
}
```

Example response:
```
Success
```


## How to run tests
```
npm run test
```
