// routes for my analyses about the Philippines

const generalroutes = require("./philippines/generalroutes");
const missions = require("./philippines/missions");
const persons = require("./philippines/persons");

async function routes(fastify, options) {
  fastify.get("/statistics/general/", generalroutes.statsGeneral);
  fastify.get("/statistics/keys/", generalroutes.statsKeys);

  // persons
  fastify.get("/persons/births/", persons.personsBirths);
  fastify.get("/persons/deaths/", persons.personsDeaths);
  fastify.get("/persons/resignations/", persons.personsResignations);

  // missions
  fastify.get("/missions/general/", missions.missionsGeneral);
}

module.exports = routes;
