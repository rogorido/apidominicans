// routes for my analyses about the Philippines

const generalroutes = require("./philippines/generalroutes");
const missions = require("./philippines/missions");
const persons = require("./philippines/persons");
const positions = require("./philippines/positions");
const others = require("./philippines/others");

async function routes(fastify, options) {
  fastify.get("/statistics/general/", generalroutes.statsGeneral);
  fastify.get("/statistics/keys/", generalroutes.statsKeys);

  // persons
  fastify.get("/persons/", persons.personsMostInfo);
  fastify.get("/persons/:id", persons.personsId);
  fastify.get("/persons/birthsdeaths/", persons.personsBirthsDeaths);
  fastify.get("/persons/resignations/", persons.personsResignations);

  // positions, etc.
  fastify.get("/positions/", positions.positionsAll);

  // missions
  fastify.get("/missions/general/", missions.missionsGeneral);

  // positions, etc.
  fastify.get("/others/languages/", others.languagesAll);
}

module.exports = routes;
