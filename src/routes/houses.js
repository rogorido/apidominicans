const { db, pgp } = require("../db/dbconnect");

const {
  sqlHousesGeneralData,
  sqlHousesProvinces,
  sqlHousesSocio,
} = require("../helpers/readsqls/readsqls");

const schemas = require("../helpers/schemadescriptions");

async function routes(fastify, options) {
  fastify.get("/statistics/general/", async (request, reply) => {
    try {
      const housesList = await db.many(sqlHousesGeneralData);
      return reply.status(200).send(housesList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/houses/", schemas.getAllHouses, async (request, reply) => {
    try {
      const housesList = await db.many(sqlHousesSocio);
      return reply.status(200).send(housesList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get(
    "/provinces/",
    schemas.getHousesProvinces,
    async (request, reply) => {
      try {
        const provList = await db.many(sqlHousesProvinces);
        return reply.status(200).send(provList);
      } catch (err) {
        console.log(err);
        return reply.status(400).send(err);
      }
    },
  );
}

module.exports = routes;
