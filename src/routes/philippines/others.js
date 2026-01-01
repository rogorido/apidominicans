const { db } = require("../../db/dbconnect");

const sqls = require("../../helpers/readsqls/readsqls-philippines");

async function languagesAll(request, reply) {
  try {
    const languagesAll = await db.query(sqls.sqlLanguages);
    return reply.status(200).send(languagesAll);
  } catch (err) {
    console.log(err);
    return reply.status(400).send(err);
  }
}

module.exports = {
  languagesAll,
};
