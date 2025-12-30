const { readSQL } = require("../helpers");

// 1570
const sqlResolutionsGeneralData = readSQL(
  "../sql/resolutions/1570/resolutions_per_chapter.sql"
);
const sqlChaptersPerDecade = readSQL(
  "../sql/resolutions/chapters_per_decade.sql"
);
const sqlChaptersPerPlaces = readSQL(
  "../sql/resolutions/chapters_per_places.sql"
);
const sqlThemesList = readSQL("../sql/resolutions/1570/themes_list.sql");
const sqlResolutionsThemesStats = readSQL(
  "../sql/resolutions/1570/themes_list_count.sql"
);
const sqlResolutionsThemesDetails = readSQL(
  "../sql/resolutions/1570/themes_details.sql"
);

// más simple... paso por ahora
// const sqlCapGensStats = readSQL("../sql/resolutions/1570/capgens_list_count.sql");
// lo mismo pero con rollup, auqnue chapucero
const sqlCapGensStats = readSQL(
  "../sql/resolutions/1570/capgens_list_count.sql"
);
const sqlResolutionsTypesStats = readSQL(
  "../sql/resolutions/1570/resolutionstypes_list_count.sql"
);
const sqlResolutionsAddData = readSQL(
  "../sql/resolutions/1570/resolutions_adddata.sql"
);

const sqlFindResolutionsWithFilters = readSQL(
  "../sql/resolutions/1570/resolutions_with_filters.sql"
);

const sqlFindResolutionsWithProvinces = readSQL(
  "../sql/resolutions/1570/resolutions_provinces.sql"
);

// para rellenar comboboxes
const sqlHousesOriginAffiliation = readSQL(
  "../sql/resolutions/1570/houses_origin.sql"
);
const sqlHousesDestinationAffiliation = readSQL(
  "../sql/resolutions/1570/houses_destination.sql"
);

const sqlProvinces = readSQL("../sql/resolutions/1570/provinces.sql");
const sqlProvincesStats = readSQL(
  "../sql/resolutions/1570/capgens_provinces_stats.sql"
);
const sqlProvincesDetails = readSQL(
  "../sql/resolutions/1570/capgens_provinces_details.sql"
);
const sqlProvincesDetailsThemes = readSQL(
  "../sql/resolutions/1570/capgens_provinces_details_themes.sql"
);

// para ver cosas así rápido tb para meter los datos orientándome
const sqlLicencesStats = readSQL("../sql/resolutions/1570/licences_stats.sql");
const sqlProhibitions = readSQL("../sql/resolutions/1570/prohibitions.sql");
const sqlRetroStats = readSQL("../sql/resolutions/1570/retro_stats.sql");

//
const sqlSufragiosStats = readSQL(
  "../sql/resolutions/1570/sufragios_stats.sql"
);

// aprobaciones
const sqlAprobacionesGeneral = readSQL(
  "../sql/resolutions/1570/aprobations_general.sql"
);
const sqlAprobacionesTipos = readSQL(
  "../sql/resolutions/1570/aprobations_types.sql"
);
const sqlAprobacionesProvincias = readSQL(
  "../sql/resolutions/1570/aprobations_provinces.sql"
);
const sqlAprobacionesProvinciasSinPredGens = readSQL(
  "../sql/resolutions/1570/aprobations_provinces_without_generalpreachers.sql"
);
const sqlAprobacionesProvinciasDetails = readSQL(
  "../sql/resolutions/1570/aprobations_provinces_details.sql"
);

//
const sqlResolutionsLookAgain = readSQL(
  "../sql/resolutions/1570/resolutions_lookagain.sql"
);

const sqlAffiliationsOrigins = readSQL(
  "../sql/resolutions/1570/affiliations_origins.sql"
);
const sqlAffiliationsDestinations = readSQL(
  "../sql/resolutions/1570/affiliations_destinations.sql"
);

const sqlPenasStats = readSQL("../sql/resolutions/1570/penas_stats.sql");

const sqlThemesOrdinationes = readSQL(
  "../sql/resolutions/1570/themes_ordinationes.sql"
);

module.exports = {
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
};
