const { db } = require("../db/dbconnect");

async function routes(fastify, options) {
  fastify.get("/version", async (request, reply) => {
    return { version: process.env.npm_package_version };
  });

  fastify.get("/datos", async (request, reply) => {
    try {
      const categories = await db.one("select count(*) from places");
      reply.status(200).send(categories);
    } catch (err) {
      console.log(err);
      reply.status(404).send(err);
    }
  });

  fastify.get("/generalstats", async (request, reply) => {
    try {
      const [
        events,
        positions,
        titles,
        relations,
        genders,
        places,
        individuals,
      ] = await Promise.all([
        persons.aggregate(q.eventstypes).toArray(),
        persons.aggregate(q.positionstypes).toArray(),
        persons.aggregate(q.titlestypes).toArray(),
        persons.aggregate(q.relationstypes).toArray(),
        persons.aggregate(q.genders).toArray(),
        persons.aggregate(pl_places_global).toArray(),
        persons.countDocuments(),
      ]);

      const gendersChartData = createDataChartGenders(genders);

      reply.status(200).send({
        totalEvents: events.length,
        totalPositions: positions.length,
        totalTitles: titles.length,
        totalRelations: relations.length,
        totalGenders: genders,
        totalPersons: individuals,
        totalPlaces: places.length,
        version: process.env.npm_package_version,
        gendersChartData,
      });
    } catch (error) {
      console.error(error);
      reply.status(500).send("Error in the server or in the query");
    }
  });
}

module.exports = routes;
