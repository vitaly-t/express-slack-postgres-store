# Slack Express Postgres Store

This is a super simple store implementation for [express-slack](https://github.com/johnagan/express-slack).

## Install

`npm install --save exprss-slack-postgres-store`

### Create store database table

The database table used by the store module must be created. Example creating a database table named _store_:

```
CREATE TABLE IF NOT EXISTS store (
  id char(50) NOT NULL PRIMARY KEY,
  data jsonb
)
```

## Usage

```js
const dataStore = require("express-slack-postgres-store")({
  database: process.env.DATABASE_URL + "?ssl=true",
  table: "store"
});
```

Argument | Description
:---|:---
**database** | Postgres [connection string](https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax#connection-string)
**table** | Database table name for data store

Now use the initialized variable as a data store when configuring [express-slack](https://github.com/johnagan/express-slack):

```
app.use('/slack', slack({
  scope: SCOPE,
  token: TOKEN,
  store: dataStore
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET
}));
```
