const { db } = require("../../db/dbconnect");

const sqls = require("../../helpers/readsqls/readsqls-philippines");

// TODO: is this multi or db.many?
async function missionsGeneral(request, reply) {
  try {
    const [missionsGeneral] = await db.multi(sqls.sqlMissionsGeneral);
    return reply.status(200).send({
      missionsGeneral,
    });
  } catch (err) {
    console.log(err);
    return reply.status(400).send(err);
  }
}

module.exports = { missionsGeneral };
