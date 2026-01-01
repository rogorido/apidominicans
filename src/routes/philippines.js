// routes for my analyses about the Philippines

const { db, pgp } = require("../db/dbconnect");

const { sqlKeysUsed } = require("../helpers/readsqls/readsqls-philippines");

async function routes(fastify, options) {
  fastify.get("/statistics/general/", async (request, reply) => {
    try {
      const rowsList = await db.many(sqlKeysUsed);
      return reply.status(200).send(rowsList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });
}

module.exports = routes;
