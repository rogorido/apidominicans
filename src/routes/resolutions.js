const { db, pgp } = require("../db/dbconnect");

const {
  sqlResolutionsGeneralData,
  sqlChaptersPerDecade,
  sqlChaptersPerPlaces,
  sqlThemesList,
  sqlResolutionsThemesStats,
  sqlResolutionsThemesDetails,
  sqlCapGensStats,
  sqlResolutionsTypesStats,
  sqlResolutionsAddData,
  sqlFindResolutionsWithFilters,
  sqlFindResolutionsWithProvinces,
  sqlHousesOriginAffiliation,
  sqlHousesDestinationAffiliation,
  sqlProvinces,
  sqlProvincesStats,
  sqlProvincesDetails,
  sqlProvincesDetailsThemes,
  sqlLicencesStats,
  sqlProhibitions,
  sqlRetroStats,
  sqlSufragiosStats,
  sqlAprobacionesGeneral,
  sqlAprobacionesTipos,
  sqlAprobacionesProvincias,
  sqlAprobacionesProvinciasSinPredGens,
  sqlAprobacionesProvinciasDetails,
  sqlResolutionsLookAgain,
  sqlAffiliationsOrigins,
  sqlAffiliationsDestinations,
  sqlPenasStats,
  sqlThemesOrdinationes,
} = require("../helpers/readsqls/readsqls-resolutions");

async function routes(fastify, options) {
  fastify.get("/statistics/general/", async (request, reply) => {
    try {
      const [
        nResolutions,
        nResolutionsThemes,
        nResolutionsDetails,
        nResolutionsPerChapter,
      ] = await db.multi(sqlResolutionsGeneralData);

      return reply.status(200).send({
        nResolutionsPerChapter,
        nResolutions,
        nResolutionsThemes,
        nResolutionsDetails,
      });
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/capgens/", async (request, reply) => {
    try {
      const rowList = await db.many(sqlCapGensStats);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/capgensperdecade/", async (request, reply) => {
    try {
      const rowList = await db.query(sqlChaptersPerDecade);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/capgensperplaces/", async (request, reply) => {
    try {
      const rowList = await db.many(sqlChaptersPerPlaces);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/themes/", async (request, reply) => {
    try {
      const rowList = await db.many(sqlThemesList);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/themes/stats/", async (request, reply) => {
    try {
      const rowList = await db.many(sqlResolutionsThemesStats);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/themes/details/", async (request, reply) => {
    const theme = request.query.theme;

    // formateamos el SQL del file con lo que nos devuelve
    // la clase FilterSet de todos los parámetros de la query
    // var querysql = pgp.as.format(
    //   sqlFindResolutionsWithProvinces,
    //   new FilterSetProvinces(queryparams)
    // );
    try {
      const rowList = await db.any(sqlResolutionsThemesDetails, theme);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/resolutions/stats/", async (request, reply) => {
    try {
      const rowList = await db.many(sqlResolutionsTypesStats);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/resolutions/adddata/", async (request, reply) => {
    try {
      const rowList = await db.any(sqlResolutionsAddData);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/houses/origin/", async (request, reply) => {
    try {
      const rowList = await db.many(sqlHousesOriginAffiliation);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/houses/destination/", async (request, reply) => {
    try {
      const rowList = await db.many(sqlHousesDestinationAffiliation);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/resolutions/lookagain/", async (request, reply) => {
    try {
      const rowList = await db.any(sqlResolutionsLookAgain);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/sufragios/stats/", async (request, reply) => {
    try {
      const rowList = await db.any(sqlSufragiosStats);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/licences/stats/", async (request, reply) => {
    try {
      const rowList = await db.any(sqlLicencesStats);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/prohibitions/", async (request, reply) => {
    try {
      const rowList = await db.any(sqlProhibitions);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/provinces/", async (request, reply) => {
    try {
      const rowList = await db.many(sqlProvinces);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/resolutions/", async (request, reply) => {
    let rowList = [];
    const queryparams = request.query;

    // are there any params?
    if (Object.keys(queryparams).length === 0) {
      console.log("vacio");
      return reply.status(200).send({ message: "no params" });
    }

    console.log("los parametros antes de manipular son", queryparams);

    // necesitamos convertir lo de themes en un array en el caso de q
    // no lo sea, que es cuando solo viene uno
    if (queryparams.theme) {
      queryparams.theme = Array.isArray(queryparams.theme)
        ? queryparams.theme
        : [queryparams.theme];

      // necesitamos pasar el elemento theme a un array de integers
      queryparams.theme = queryparams.theme.map((i) => parseInt(i));
    }

    // necesitamos convertir lo de provinces en un array en el caso de q
    // no lo sea, que es cuando solo viene uno
    if (queryparams.province) {
      queryparams.province = Array.isArray(queryparams.province)
        ? queryparams.province
        : [queryparams.province];

      // necesitamos pasar el elemento theme a un array de integers
      queryparams.province = queryparams.province.map((i) => parseInt(i));
    }

    console.log("los parametros son", queryparams);

    try {
      // formateamos el SQL del file con lo que nos devuelve
      // la clase FilterSet de todos los parámetros de la query
      var querysql = pgp.as.format(
        sqlFindResolutionsWithFilters,
        new FilterSetGeneral(queryparams),
      );
      // console.log(querysql);
      rowList = await db.any(querysql);

      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  // NOTE: realmente esto repite mucha funcionalidad de lo anterior...
  fastify.get("/resolutionsperprovince/", async (request, reply) => {
    let rowList = [];
    const queryparams = request.query;

    // are there any params?
    if (Object.keys(queryparams).length === 0) {
      console.log("vacio");
      return reply.status(200).send({ message: "no params" });
    }

    // necesitamos convertir lo de themes en un array en el caso de q
    // no lo sea, que es cuando solo viene uno
    queryparams.province = Array.isArray(queryparams.province)
      ? queryparams.province
      : [queryparams.province];

    // necesitamos pasar el elemento theme a un array de integers
    queryparams.province = queryparams.province.map((i) => parseInt(i));
    // console.log("Los parámetros son:", queryparams);

    let j = new FilterSetProvinces(queryparams);
    console.log(j);

    try {
      // formateamos el SQL del file con lo que nos devuelve
      // la clase FilterSet de todos los parámetros de la query
      var querysql = pgp.as.format(
        sqlFindResolutionsWithProvinces,
        new FilterSetProvinces(queryparams),
      );
      rowList = await db.any(querysql);

      return reply.status(200).send(rowList);
    } catch (err) {
      return reply.status(400).send(err);
    }
  });

  fastify.get("/affiliations/", async (request, reply) => {
    try {
      const origins = await db.many(sqlAffiliationsOrigins);
      const destinations = await db.many(sqlAffiliationsDestinations);

      return reply.status(200).send({ origins, destinations });
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/penas/", async (request, reply) => {
    try {
      const rowList = await db.many(sqlPenasStats);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/provinces/stats/", async (request, reply) => {
    try {
      const rowList = await db.many(sqlProvincesStats);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/stats/retro/", async (request, reply) => {
    try {
      const rowList = await db.many(sqlRetroStats);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/approbations/general/", (request, reply) => {
    db.task("AprobationsStats", async (t) => {
      const rowListGeneral = await t.many(sqlAprobacionesGeneral);
      const rowListTypes = await t.many(sqlAprobacionesTipos);
      const rowListProvinces = await t.many(sqlAprobacionesProvincias);
      const rowListProvincesNoGenPred = await t.many(
        sqlAprobacionesProvinciasSinPredGens,
      );
      return {
        general: rowListGeneral,
        tipos: rowListTypes,
        provinces: rowListProvinces,
        provincesnogenpred: rowListProvincesNoGenPred,
      };
    })
      .then((data) => {
        return reply.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // TODO: is this really working? is there any param?
  fastify.get("/approbations/", async (request, reply) => {
    const province = request.query.province;

    try {
      const rowListDetails = await db.any(
        sqlAprobacionesProvinciasDetails,
        province,
      );

      return reply.status(200).send(rowListDetails);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  // TODO: is this really working? is there any param?
  fastify.get("/provinces/details/", (request, reply) => {
    const province = request.query.province;

    db.task("ProvinceDetails", async (t) => {
      const rowListDetails = await t.any(sqlProvincesDetails, province);
      const rowListDetailsThemes = await t.any(
        sqlProvincesDetailsThemes,
        province,
      );
      return { details: rowListDetails, themes: rowListDetailsThemes };
    })
      .then((data) => {
        return reply.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  fastify.get("/themes/ordinationes/", async (request, reply) => {
    try {
      const rowList = await db.many(sqlThemesOrdinationes);
      return reply.status(200).send(rowList);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });
}

module.exports = routes;
