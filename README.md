# Assignment - Actian Careers

This assignmnet is to design an API using node and express. Coding written in TypeScript.

# Table of contents

- [Requirement](#requirement)
- [Dependency](#dependency)
- [CodeFlow](#codeflow)
- [API](#api)
- [UnitTest](#unittest)
- [Run](#run)
  - [CMD](#cmd)
  - [Docker](#docker)

# Requirement

- Your task is to create a simple Node.js RESTful application with only one endpoint that makes an API call to Actian Careers and request an HTML page, and parse through the HTML to retrieve list of titles of open positions for a department.

- The application endpoint should work for every department section under Open Positions from https://www.actian.com/company/careers link.

- The http response content must contain a list of titles of open positions for a department with appropriate http status code.

##### Example:

- Request: Get list of open positions for department “Engineering”.
- Response: Contains list of current job openings for department “Engineering” from Actian careers page.
- The department name is mandatory. In case of no department, please return the message “Department is required!”
- In the case of no department in the page, please return the message "No department found!".

You can either use Typescript or JavaScript and use the built-in fetch API or `npm install` a
community package to perform requests.

# Dependency

```
"dependencies": {
    "@types/express": "^4.17.17",
    "@types/node": "^20.5.7",
    "axios": "^1.5.0",
    "cheerio": "^1.0.0-rc.12", // To parse HTML
    "express": "^4.18.2",
    "node-cache": "^5.1.2", // To store parse HTML data for quick retrival and TTL = 5 min
    "ts-node": "^10.9.1",
    "typescript": "^5.2.2",
    "winston": "^3.10.0" // For logger
  },
"devDependencies": {
   "@types/jest": "^29.5.4", // For unit test case
   "node-mocks-http": "^1.13.0",
   "nodemon": "^3.0.1",
   "ts-jest": "^29.1.1"
}
```

# CodeFlow

The entry point of the project is `src/app.ts` file, where i have defined the node express server and we have the router flow.

```
app.use('/actian', router);

app.listen(PORT, () => {
  Logger.info(`Server is running http://localhost:${PORT}/`);
});
```

- I am parsing HTML using `cheerio` package. and logic is present in `src\services\actian.service.ts -> parseHtml()`.
- As HTML parsing is expensive task so I have used `node-cache` package for caching the HTML data. But cache is valid for `5min` and it set as `TTL=300`.
- If cache is expaired then again HTML will parse when request come.

# API

```
URL: http://localhost:{{PORT}}/actian?department={{DATA}}
METHOD: GET
```

`!!! Enter valid PORT number and department after running the application`

#### Response Body

On correct department type

```
{
    "status": 200,
    "message": "Success",
    "data": {
        "department": "department name",
        "openings": [
            {
                "position": "some position",
                "location": "some location",
                "jobLink": "some url"
            }
        ]
    }
}
```

On in-correct department type

```
{
    "status": 200,
    "message": "No department found!"
}
```

On missing department type

```
{
    "status": 400,
    "message": "Department is required"
}
```

# UnitTest

Run unit test from project root folder by using `npm test` command.

# Run

## CMD

Please follow below steps to run this application in your local system.

- You should have `node` installed in your system.
- Clone this repository.
- Go to project root folder and open CMD or Terminal.
- Install all dependecies by running below command
  ```
     npm install
  ```
- Run application as development mode
  ```
     npm run dev
  ```
- Build application
  ```
     npm run build
  ```
- Run application as production mode
  ```
     npm start
  ```

## Docker

You need to have docker host installed in your system to run the application as docker container. Please follow below steps to run the application in docker.

- Clone this repository.
- Start your docker host in your system.
- Go to project root folder and open CMD or Terminal.
- Build the image using below command.

```
docker build . -f Dockerfile -t sangram_actian_api
```

- Run the image and expose `port 3030`.

```
 docker run -p 3030:3000 sangram_actian_api
```

- Now you can API endpoint port as `3030`
