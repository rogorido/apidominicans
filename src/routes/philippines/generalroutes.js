const { db } = require("../../db/dbconnect");

const { sqlKeysUsed } = require("../../helpers/readsqls/readsqls-philippines");

async function generalStats(request, reply) {
  try {
    const [
      keysused,
      keysused_cargo,
      keysused_muerte,
      keysused_viaje,
      keysused_renuncia,
    ] = await db.multi(sqlKeysUsed);
    return reply
      .status(200)
      .send({
        keysused,
        keysused_cargo,
        keysused_muerte,
        keysused_viaje,
        keysused_renuncia,
      });
  } catch (err) {
    console.log(err);
    return reply.status(400).send(err);
  }
}

module.exports = { generalStats };
