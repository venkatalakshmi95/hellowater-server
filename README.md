# Skeleton of a node.js / typescript / express / postgres app

## Install Node / NPM

https://docs.npmjs.com/getting-started/installing-node

## Install TypeScript

https://www.npmjs.com/package/typescript

## Create table in your Postgres DB:

```
CREATE TABLE test (
  testcolumn VARCHAR(20)
);
```

## Download this repo

download and run `npm install`

## Set the following ENV VARs for your DB Connections:

`export DB_USER='' DB='' DB_PASS='' DB_HOST='' DB_PORT='' DB_MAX_CLIENTS='' DB_IDLE_TIMEOUT_MS=''`

this can also be done by creating a `.env` file in the root of this project see `.env.example` for a reference

## Quickstart: transpile, lint and start the app all at once

`npm start`

### Or each step individually:

1. Transpile TypeScript to the build folder

run `tsc`

1. Run ESLint

`npm run lint`

1. Run your built node app

`node build/app.js`
