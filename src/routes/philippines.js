// routes for my analyses about the Philippines

const generalroutes = require("./philippines/generalroutes");
const missions = require("./philippines/missions");
const persons = require("./philippines/persons");
const positions = require("./philippines/positions");
const professions = require("./philippines/professions");
const others = require("./philippines/others");

async function routes(fastify, options) {
  fastify.get("/statistics/general/", generalroutes.statsGeneral);
  fastify.get("/statistics/keys/", generalroutes.statsKeys);

  // persons
  fastify.get("/persons/", persons.personsAllFlat);
  fastify.get("/persons/mostinfo/", persons.personsMostInfo);
  fastify.get("/persons/:id", persons.personsId);
  fastify.get("/persons/details/:id", persons.personsIdDetails);
  fastify.get("/persons/birthsdeaths/", persons.personsBirthsDeaths);
  fastify.get("/persons/resignations/", persons.personsResignations);

  // positions, etc.
  fastify.get("/positions/", positions.positionsAll);

  // positions, etc.
  fastify.get("/professions/", professions.professionsAll);

  // missions
  fastify.get("/missions/general/", missions.missionsGeneral);

  // positions, etc.
  fastify.get("/others/languages/", others.languagesAll);
}

module.exports = routes;
