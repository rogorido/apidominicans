const Promise = require("bluebird");

const initOptions = { promiseLib: Promise };
const pgp = require("pg-promise")(initOptions);

username = process.env.PG_USER;
password = process.env.PG_PASSWORD;
pgport = process.env.PGPORT;

const db = pgp(
  `postgres://${username}:${password}@localhost:${pgport}/dominicos`
);

const monitor = require("pg-monitor");
monitor.attach(initOptions);

module.exports = {
  db,
  pgp,
};
