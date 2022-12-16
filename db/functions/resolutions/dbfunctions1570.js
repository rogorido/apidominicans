// esto en principio es lo mismo que el otro pero todo está filtrado
// para que sea solo ab 1570.
const { db, pgp } = require("../../dbconnect");
const { FilterSetGeneral, FilterSetProvinces } = require("../../helpers");

// Es necesario crearlo aquí globalmente y no en la función concreta
// por no sé cuestión interna...
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
} = require("../../readsqls-resolutions");

async function getGeneralData(req, res) {
  try {
    const [
      nResolutions,
      nResolutionsThemes,
      nResolutionsDetails,
      nResolutionsPerChapter,
    ] = await db.multi(sqlResolutionsGeneralData);

    res.send({
      nResolutionsPerChapter,
      nResolutions,
      nResolutionsThemes,
      nResolutionsDetails,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getChaptersPerDecade(req, res) {
  try {
    const rowList = await db.query(sqlChaptersPerDecade);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getChaptersPerPlaces(req, res) {
  try {
    const rowList = await db.many(sqlChaptersPerPlaces);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getThemesList(req, res) {
  try {
    const rowList = await db.many(sqlThemesList);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getThemesStats(req, res) {
  try {
    const rowList = await db.many(sqlResolutionsThemesStats);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getThemesDetails(req, res) {
  const theme = req.query.theme;

  // formateamos el SQL del file con lo que nos devuelve
  // la clase FilterSet de todos los parámetros de la query
  // var querysql = pgp.as.format(
  //   sqlFindResolutionsWithProvinces,
  //   new FilterSetProvinces(queryparams)
  // );
  try {
    const rowList = await db.any(sqlResolutionsThemesDetails, theme);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getCapGensStats(req, res) {
  try {
    const rowList = await db.many(sqlCapGensStats);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getResolutionsTypesStats(req, res) {
  try {
    const rowList = await db.many(sqlResolutionsTypesStats);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getResolutionsAddData(req, res) {
  try {
    const rowList = await db.any(sqlResolutionsAddData);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getHousesOriginAffiliation(req, res) {
  try {
    const rowList = await db.many(sqlHousesOriginAffiliation);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getHousesDestinationAffiliation(req, res) {
  try {
    const rowList = await db.many(sqlHousesDestinationAffiliation);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getResolutionsLookAgain(req, res) {
  try {
    const rowList = await db.any(sqlResolutionsLookAgain);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getSufragiosStats(req, res) {
  try {
    const rowList = await db.any(sqlSufragiosStats);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getLicencesStats(req, res) {
  try {
    const rowList = await db.many(sqlLicencesStats);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getProhibitions(req, res) {
  try {
    const rowList = await db.many(sqlProhibitions);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getProvinces(req, res) {
  try {
    const rowList = await db.many(sqlProvinces);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getResolutionsWithFilters(req, res) {
  let rowList = [];
  const queryparams = req.query;

  // are there any params?
  if (Object.keys(queryparams).length === 0) {
    console.log("vacio");
    return;
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
      new FilterSetGeneral(queryparams)
    );
    // console.log(querysql);
    rowList = await db.any(querysql);

    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

// rtt esto repite mucha funcionalidad de lo anterior...
async function getResolutionsWithProvinces(req, res) {
  let rowList = [];
  const queryparams = req.query;

  // are there any params?
  if (Object.keys(queryparams).length === 0) {
    console.log("vacio");
    return;
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
      new FilterSetProvinces(queryparams)
    );
    rowList = await db.any(querysql);

    res.send(rowList);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function getAffiliations(req, res) {
  try {
    const origins = await db.many(sqlAffiliationsOrigins);
    const destinations = await db.many(sqlAffiliationsDestinations);

    res.send({ origins, destinations });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getPenasStats(req, res) {
  try {
    const penas = await db.many(sqlPenasStats);
    res.send(penas);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function getProvincesStats(req, res) {
  try {
    const rowList = await db.many(sqlProvincesStats);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getRetroStats(req, res) {
  try {
    const rowList = await db.many(sqlRetroStats);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

function getAprobationsStats(req, res) {
  db.task("AprobationsStats", async (t) => {
    const rowListGeneral = await t.many(sqlAprobacionesGeneral);
    const rowListTypes = await t.many(sqlAprobacionesTipos);
    const rowListProvinces = await t.many(sqlAprobacionesProvincias);
    const rowListProvincesNoGenPred = await t.many(
      sqlAprobacionesProvinciasSinPredGens
    );
    return {
      general: rowListGeneral,
      tipos: rowListTypes,
      provinces: rowListProvinces,
      provincesnogenpred: rowListProvincesNoGenPred,
    };
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getAprobationsProvincesDetails(req, res) {
  const province = req.query.province;

  try {
    const rowListDetails = await db.any(
      sqlAprobacionesProvinciasDetails,
      province
    );

    res.send(rowListDetails);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

function getProvincesDetails(req, res) {
  const province = req.query.province;

  db.task("ProvinceDetails", async (t) => {
    const rowListDetails = await t.any(sqlProvincesDetails, province);
    const rowListDetailsThemes = await t.any(
      sqlProvincesDetailsThemes,
      province
    );
    return { details: rowListDetails, themes: rowListDetailsThemes };
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getThemesOrdinationes(req, res) {
  try {
    const rowList = await db.many(sqlThemesOrdinationes);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

module.exports = {
  getGeneralData,
  getThemesList,
  getThemesStats,
  getThemesDetails,
  getCapGensStats,
  getChaptersPerDecade,
  getChaptersPerPlaces,
  getResolutionsTypesStats,
  getResolutionsAddData,
  getHousesOriginAffiliation,
  getHousesDestinationAffiliation,
  getResolutionsLookAgain,
  getSufragiosStats,
  getLicencesStats,
  getProhibitions,
  getProvinces,
  getResolutionsWithFilters,
  getResolutionsWithProvinces,
  getAffiliations,
  getPenasStats,
  getProvincesStats,
  getRetroStats,
  getAprobationsStats,
  getAprobationsProvincesDetails,
  getProvincesDetails,
  getThemesOrdinationes,
};
