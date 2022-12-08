const Promise = require("bluebird");

// no sé si rtt son ya los q viene por omisión
// http://bluebirdjs.com/docs/api/promise.config.html
Promise.config({
  // Enable warnings
  warnings: true,
  // Enable long stack traces
  // atención, esto habría q deshabilitarlo en producción... pero cómo?
  longStackTraces: true,
  // Enable cancellation
  cancellation: true,
  // Enable monitoring
  monitoring: true,
  // Enable async hooks
  asyncHooks: true,
});

const initOptions = { promiseLib: Promise };
const pgp = require("pg-promise")(initOptions);

username = process.env.PG_USER;
password = process.env.PG_PASSWORD;
pgport = process.env.PGPORT;

// pgp.pg.types.setTypeParser(20, BigInt); // Type Id 20 = BIGINT | BIGSERIAL

const db = pgp(
  `postgres://${username}:${password}@localhost:${pgport}/dominicos`
);

const monitor = require("pg-monitor");
monitor.attach(initOptions);

module.exports = {
  db,
  pgp,
};
