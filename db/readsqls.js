const { readSQL } = require("./helpers");

// Es necesario crearlo aquí globalmente y no en la función concreta
// por no sé cuestión interna...
const sqlStatisticsLanguages = readSQL(
  "../sql/statistics/statisticslanguages.sql"
);

const sqlStatisticsMainPage = readSQL("../sql/statistics/stats_mainpage.sql");
const sqlMainPageTotalPlaces = readSQL(
  "../sql/statistics/stats_totalplaces.sql"
);
const sqlWorksWithoutThemes = readSQL(
  "../sql/statistics/stats_works_without_theme.sql"
);

const sqlFormats = readSQL("../sql/statistics/stats_formats.sql");

// category
const sqlCategoriesAll = readSQL("../sql/category/categoriesall.sql");
const sqlWorksCategory = readSQL("../sql/category/totalworks.sql");
const sqlAuthorsCategory = readSQL("../sql/category/totalauthors.sql");
const sqlPlacesCategory = readSQL("../sql/category/totalplaces.sql");
const sqlCategoryDecades = readSQL("../sql/category/cats_decades.sql");
const sqlCategoryRelated = readSQL("../sql/category/related_cats.sql");
const sqlCategoryConcreteAuthors = readSQL(
  "../sql/category/authorswithcat.sql"
);

// places
const sqlPlacesTotal = readSQL("../sql/places/totalplaces.sql");
const sqlPlacesbyIdCategories = readSQL("../sql/places/placeid_categories.sql");
const sqlPlacesbyIdDecades = readSQL("../sql/places/placeid_decades.sql");
const sqlPlacesbyIdOtherData = readSQL("../sql/places/placeid_otherdata.sql");

// authors
const sqlAuthorsAll = readSQL("../sql/authors/authorsall.sql");
const sqlAuthorsById = readSQL("../sql/authors/authorbyid.sql");
const sqlAuthorsByIdCategories = readSQL("../sql/authors/authorbyidcats.sql");

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
};
