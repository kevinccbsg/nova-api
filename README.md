[![Run tests](https://github.com/kevinccbsg/nova-api/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/kevinccbsg/nova-api/actions/workflows/ci.yml)

# nova-api

Nova challenge API. This is an node js API with MongoDB as DB. This API has two endpoints. One to register nominations and the other one to show all the nominations. You can check out the docs in [this page](https://nova-challenge-api.herokuapp.com/api-docs/).

![alt text](https://github.com/kevinccbsg//nova-api/blob/main/images/swagger.png "nova docs")

## How to collaborate

If you want to collaborate you need Node.js ([.npmrc version](https://github.com/kevinccbsg/nova-api/blob/main/.nvmrc)), and [Docker](https://docs.docker.com/get-docker/).

Run docker MongoDB DB:

```
npm run docker
```

Install dependencies

```
npm install
```

This is the project structure

```
index.js
tests
app
├───config
├───constants
├───controller
├───docsValidator
├───email
├───mongodb
│   └───models
└───routes
    └───schemas
```

If you want to run the tests:

```
npm test
```

We really recommend to run tests with this ENV variable while you are adding new features to check API errors.

```
DEBUG=error* npm test
```
