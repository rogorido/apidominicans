const { db } = require("../../db/dbconnect");

const sqls = require("../../helpers/readsqls/readsqls-philippines");

async function personsAllFlat(request, reply) {
  try {
    const personsAllFlat = await db.query(sqls.sqlPersonsAll);
    return reply.status(200).send(personsAllFlat);
  } catch (err) {
    console.log(err);
    return reply.status(400).send(err);
  }
}

async function personsMostInfo(request, reply) {
  try {
    const personsMostInfo = await db.query(sqls.sqlPersonsMostInfo);
    return reply.status(200).send(personsMostInfo);
  } catch (err) {
    console.log(err);
    return reply.status(400).send(err);
  }
}

function personsId(request, reply) {
  const person_id = request.params.id;

  if (person_id == null || person_id == "") {
    return reply.status(500).send({ message: "No person_id" });
  }

  db.task("personbyid", async (t) => {
    const personflat = await t.one(sqls.sqlPersonbyId, person_id);
    const [details, offices, deaths, travels] = await t.multi(
      sqls.sqlPersonbyIdDetails,
      person_id,
    );

    return {
      personflat,
      details,
      offices,
      deaths,
      travels,
    };
  })
    .then((data) => {
      return reply.status(200).send(data);
    })
    .catch((error) => {
      console.log(error);
      return reply.status(400).send(error);
    });
}

async function personsBirthsDeaths(request, reply) {
  try {
    const [births, deaths, deathsplaces] = await db.multi(
      sqls.sqlPersonsBirthsDeaths,
    );
    return reply.status(200).send({
      births,
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

// Function used in the page person/:id
// for showing details about cargos, etc.
async function personsIdDetails(request, reply) {
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
  personsAllFlat,
  personsMostInfo,
  personsId,
  personsBirthsDeaths,
  personsResignations,
  personsIdDetails,
};
