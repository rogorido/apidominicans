const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();

const initOptions = {};
const pgp = require("pg-promise")(initOptions);

username = process.env.PG_USER;
password = process.env.PG_PASSWORD;
pgport = process.env.PGPORT;

// pgp.pg.types.setTypeParser(20, BigInt); // Type Id 20 = BIGINT | BIGSERIAL

const db = pgp(
  `postgres://${username}:${password}@localhost:${pgport}/dominicos`,
);

const monitor = require("pg-monitor");
monitor.attach(initOptions, ["query", "error", "task"]);

const pglog = path.join(homedir, ".config/apidominicans/", "pg-errors.log");

// only errors go to the log file
monitor.setLog((msg, info) => {
  console.log(info.time.toString());
  // info.display = false; // suppresses all console output
  if (info.event === "error") {
    fs.appendFileSync(pglog, msg);
  }
});

module.exports = {
  db,
  pgp,
};
