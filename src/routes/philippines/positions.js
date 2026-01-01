const { db } = require("../../db/dbconnect");

const sqls = require("../../helpers/readsqls/readsqls-philippines");

async function positionsAll(request, reply) {
  try {
    const [allPositions, positionsTime, positionsYears, positionsLessSpecific] =
      await db.multi(sqls.sqlPositions);
    return reply.status(200).send({
      allPositions,
      positionsTime,
      positionsYears,
      positionsLessSpecific,
    });
  } catch (err) {
    console.log(err);
    return reply.status(400).send(err);
  }
}

module.exports = {
  positionsAll,
};
