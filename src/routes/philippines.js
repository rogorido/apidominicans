// routes for my analyses about the Philippines

const generalroutes = require("./philippines/generalroutes");

async function routes(fastify, options) {
  fastify.get("/statistics/general/", generalroutes.generalStats);
}

module.exports = routes;
