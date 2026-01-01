const { db } = require("../../db/dbconnect");

const sqls = require("../../helpers/readsqls/readsqls-philippines");

async function personsMostInfo(request, reply) {
  try {
    const personsMostInfo = await db.query(sqls.sqlPersons);
    return reply.status(200).send(personsMostInfo);
  } catch (err) {
    console.log(err);
    return reply.status(400).send(err);
  }
}

async function personsBirths(request, reply) {
  try {
    const [missionsGeneral] = await db.query(sqls.sqlPersonsBirths);
    return reply.status(200).send({
      missionsGeneral,
    });
  } catch (err) {
    console.log(err);
    return reply.status(400).send(err);
  }
}

// All infos!
async function personsDeaths(request, reply) {
  try {
    const [deaths, deathsplaces] = await db.multi(sqls.sqlPersonsDeaths);
    return reply.status(200).send({
      deaths,
      deathsplaces,
    });
  } catch (err) {
    console.log(err);
    return reply.status(400).send(err);
  }
}

// All infos!
async function personsResignations(request, reply) {
  try {
    const [
      personsResigns,
      resignationsAggMission,
      timeToResign,
      aggTypePerson,
    ] = await db.multi(sqls.sqlPersonsResignations);
    return reply.status(200).send({
      personsResigns,
      resignationsAggMission,
      timeToResign,
      aggTypePerson,
    });
  } catch (err) {
    console.log(err);
    return reply.status(400).send(err);
  }
}

module.exports = {
  personsMostInfo,
  personsBirths,
  personsDeaths,
  personsResignations,
};
