const { db } = require("../../db/dbconnect");

const sqls = require("../../helpers/readsqls/readsqls-philippines");

async function professionsAll(request, reply) {
  try {
    const [allProfessions, professionsPerPlace, professionsAndBirths] =
      await db.multi(sqls.sqlProfessions);
    return reply.status(200).send({
      allProfessions,
      professionsPerPlace,
      professionsAndBirths,
    });
  } catch (err) {
    console.log(err);
    return reply.status(400).send(err);
  }
}

module.exports = {
  professionsAll,
};
