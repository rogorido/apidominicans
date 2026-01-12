const { db } = require("../../db/dbconnect");

const sqls = require("../../helpers/readsqls/readsqls-philippines");

async function statsGeneral(request, reply) {
  try {
    const [
      personsGeneral,
      missionsTotal,
      birthPlacesTotal,
      typePersonsTotal,
      lookupTotal,
      profHousesTotal,
      provincesTotal,
      resignationsTotal,
      interesting_percs,
    ] = await db.multi(sqls.sqlStatsGeneral);
    return reply.status(200).send({
      personsGeneral,
      missionsTotal,
      birthPlacesTotal,
      typePersonsTotal,
      lookupTotal,
      profHousesTotal,
      provincesTotal,
      resignationsTotal,
      interesting_percs,
    });
  } catch (err) {
    console.log(err);
    return reply.status(400).send(err);
  }
}

async function statsKeys(request, reply) {
  try {
    const [
      keysused,
      keysused_cargo,
      keysused_muerte,
      keysused_viaje,
      keysused_renuncia,
    ] = await db.multi(sqls.sqlKeysUsed);
    return reply.status(200).send({
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

module.exports = { statsGeneral, statsKeys };
