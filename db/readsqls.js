const { readSQL } = require("./helpers");

// Es necesario crearlo aquí globalmente y no en la función concreta
// por no sé cuestión interna...
const sqlStatisticsLanguages = readSQL(
  "../sql/works/statistics/statisticslanguages.sql"
);

const sqlStatisticsMainPage = readSQL(
  "../sql/works/statistics/stats_mainpage.sql"
);
const sqlMainPageTotalPlaces = readSQL(
  "../sql/works/statistics/stats_totalplaces.sql"
);
const sqlWorksWithoutThemes = readSQL(
  "../sql/works/statistics/stats_works_without_theme.sql"
);

const sqlFormats = readSQL("../sql/works/statistics/stats_formats.sql");

// category
const sqlCategoriesAll = readSQL("../sql/works/category/categoriesall.sql");
const sqlWorksCategory = readSQL("../sql/works/category/totalworks.sql");
const sqlAuthorsCategory = readSQL("../sql/works/category/totalauthors.sql");
const sqlPlacesCategory = readSQL("../sql/works/category/totalplaces.sql");
const sqlCategoryDecades = readSQL("../sql/works/category/cats_decades.sql");
const sqlCategoryRelated = readSQL("../sql/works/category/related_cats.sql");
const sqlCategoryConcreteAuthors = readSQL(
  "../sql/works/category/authorswithcat.sql"
);

// places
const sqlPlacesTotal = readSQL("../sql/works/places/totalplaces.sql");
const sqlPlacesbyIdCategories = readSQL(
  "../sql/works/places/placeid_categories.sql"
);
const sqlPlacesbyIdDecades = readSQL("../sql/works/places/placeid_decades.sql");
const sqlPlacesbyIdOtherData = readSQL(
  "../sql/works/places/placeid_otherdata.sql"
);

// authors
const sqlAuthorsAll = readSQL("../sql/works/authors/authorsall.sql");
const sqlAuthorsById = readSQL("../sql/works/authors/authorbyid.sql");
const sqlAuthorsByIdCategories = readSQL(
  "../sql/works/authors/authorbyidcats.sql"
);

// houses
const sqlHousesGeneralData = readSQL("../sql/houses/houses_map.sql");
const sqlHousesSocio = readSQL("../sql/houses/houses_socioeconomic.sql");
const sqlHousesProvinces = readSQL("../sql/houses/provinces.sql");

module.exports = {
  sqlStatisticsLanguages,
  sqlStatisticsMainPage,
  sqlMainPageTotalPlaces,
  sqlWorksWithoutThemes,
  sqlCategoriesAll,
  sqlWorksCategory,
  sqlAuthorsCategory,
  sqlPlacesCategory,
  sqlCategoryDecades,
  sqlCategoryRelated,
  sqlCategoryConcreteAuthors,
  sqlPlacesTotal,
  sqlPlacesbyIdCategories,
  sqlPlacesbyIdDecades,
  sqlPlacesbyIdOtherData,
  sqlFormats,
  sqlAuthorsAll,
  sqlAuthorsById,
  sqlAuthorsByIdCategories,
  sqlHousesGeneralData,
  sqlHousesSocio,
  sqlHousesProvinces,
};
