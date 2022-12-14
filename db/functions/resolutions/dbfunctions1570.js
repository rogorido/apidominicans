// esto en principio es lo mismo que el otro pero todo está filtrado
// para que sea solo ab 1570.
const { db } = require("../../dbconnect");
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
}

async function getChaptersPerDecade(req, res) {
  const rowList = await db.query(sqlChaptersPerDecade);
  res.send(rowList);
}

async function getChaptersPerPlaces(req, res) {
  const rowList = await db.many(sqlChaptersPerPlaces);
  res.send(rowList);
}

async function getThemesList(req, res) {
  const rowList = await db.many(sqlThemesList);
  res.send(rowList);
}

async function getThemesStats(req, res) {
  const rowList = await db.many(sqlResolutionsThemesStats);
  res.send(rowList);
}

async function getThemesDetails(req, res) {
  const theme = req.query.theme;

  // formateamos el SQL del file con lo que nos devuelve
  // la clase FilterSet de todos los parámetros de la query
  // var querysql = pgp.as.format(
  //   sqlFindResolutionsWithProvinces,
  //   new FilterSetProvinces(queryparams)
  // );
  const rowList = await db.any(sqlResolutionsThemesDetails, theme);

  res.send(rowList);
}

async function getCapGensStats(req, res) {
  const rowList = await db.many(sqlCapGensStats);
  res.send(rowList);
}

async function getResolutionsTypesStats(req, res) {
  const rowList = await db.many(sqlResolutionsTypesStats);
  res.send(rowList);
}

async function getResolutionsAddData(req, res) {
  const rowList = await db.any(sqlResolutionsAddData);
  res.send(rowList);
}

async function getHousesOriginAffiliation(req, res) {
  const rowList = await db.many(sqlHousesOriginAffiliation);
  res.send(rowList);
}

async function getHousesDestinationAffiliation(req, res) {
  const rowList = await db.many(sqlHousesDestinationAffiliation);
  res.send(rowList);
}

async function getResolutionsLookAgain(req, res) {
  const rowList = await db.any(sqlResolutionsLookAgain);
  res.send(rowList);
}

async function getSufragiosStats(req, res) {
  const rowList = await db.any(sqlSufragiosStats);
  res.send(rowList);
}

async function getLicencesStats(req, res) {
  const rowList = await db.many(sqlLicencesStats);
  res.send(rowList);
}

async function getProhibitions(req, res) {
  const rowList = await db.many(sqlProhibitions);
  res.send(rowList);
}

async function getProvinces(req, res) {
  const rowList = await db.many(sqlProvinces);
  res.send(rowList);
}

async function getResolutionsWithFilters(req, res) {
  let rowList = [];
  const queryparams = req.query;

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
  // formateamos el SQL del file con lo que nos devuelve
  // la clase FilterSet de todos los parámetros de la query
  var querysql = pgp.as.format(
    sqlFindResolutionsWithFilters,
    new FilterSetGeneral(queryparams)
  );
  // console.log(querysql);
  rowList = await db.any(querysql);

  res.send(rowList);
}

// rtt esto repite mucha funcionalidad de lo anterior...
async function getResolutionsWithProvinces(req, res) {
  let rowList = [];
  const queryparams = req.query;

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
  // formateamos el SQL del file con lo que nos devuelve
  // la clase FilterSet de todos los parámetros de la query
  var querysql = pgp.as.format(
    sqlFindResolutionsWithProvinces,
    new FilterSetProvinces(queryparams)
  );
  rowList = await db.any(querysql);

  res.send(rowList);
}

async function getAffiliations(req, res) {
  const origins = await db.many(sqlAffiliationsOrigins);
  const destinations = await db.many(sqlAffiliationsDestinations);

  res.send({ origins, destinations });
}

async function getPenasStats(req, res) {
  const penas = await db.many(sqlPenasStats);
  res.send(penas);
}

async function getProvincesStats(req, res) {
  const rowList = await db.many(sqlProvincesStats);
  res.send(rowList);
}

async function getRetroStats(req, res) {
  const rowList = await db.many(sqlRetroStats);
  res.send(rowList);
}

async function getAprobationsStats(req, res) {
  const rowListGeneral = await db.many(sqlAprobacionesGeneral);
  const rowListTypes = await db.many(sqlAprobacionesTipos);
  const rowListProvinces = await db.many(sqlAprobacionesProvincias);
  const rowListProvincesNoGenPred = await db.many(
    sqlAprobacionesProvinciasSinPredGens
  );
  res.send({
    general: rowListGeneral,
    tipos: rowListTypes,
    provinces: rowListProvinces,
    provincesnogenpred: rowListProvincesNoGenPred,
  });
}

async function getAprobationsProvincesDetails(req, res) {
  const province = req.query.province;
  const rowListDetails = await db.any(
    sqlAprobacionesProvinciasDetails,
    province
  );

  res.send(rowListDetails);
}

async function getProvincesDetails(req, res) {
  const province = req.query.province;
  const rowListDetails = await db.any(sqlProvincesDetails, province);
  const rowListDetailsThemes = await db.any(
    sqlProvincesDetailsThemes,
    province
  );

  res.send({ details: rowListDetails, themes: rowListDetailsThemes });
}

async function getThemesOrdinationes(req, res) {
  const rowList = await db.many(sqlThemesOrdinationes);

  res.send(rowList);
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
