const { db, pgp } = require("../../dbconnect");
const { FilterSetMinimo } = require("../../helpers");

const {
  sqlCategoriesAll,
  sqlWorksCategory,
  sqlAuthorsCategory,
  sqlPlacesCategory,
  sqlCategoryDecades,
  sqlCategoryRelated,
  sqlCategoryConcreteAuthors,
} = require("../../readsqls");

// creamos una string de una query con los filtros q se le pasa
function getFormattedQuery(sql, filters) {
  const querysql = pgp.as.format(sql, new FilterSetMinimo(filters));

  return querysql;
}

async function CategoriesAll(req, res) {
  const categories = await db.many(sqlCategoriesAll);

  res.send(categories);
}

function CategoryByID(req, res) {
  const category = req.params.id;

  if (category == null) {
    return;
  }

  let filters = {};

  db.task("cat-general", async (t) => {
    filters.theme = category;

    const categoryName = await t.one(
      "SELECT theme FROM themes WHERE theme_id = $1",
      category
    );

    let querysql = getFormattedQuery(sqlWorksCategory, filters);
    const totalWorks = await t.one(querysql);

    // printed
    filters.printed = true;
    querysql = getFormattedQuery(sqlWorksCategory, filters);
    const totalPrinted = await t.one(querysql);

    // manuscrits
    filters.printed = undefined;
    filters.manuscrit = true;
    querysql = getFormattedQuery(sqlWorksCategory, filters);
    const totalManuscrits = await t.one(querysql);

    // ni manuscrits ni printed: no funciona pq es un OR y necesito AND
    // filters.printed = false;
    // filters.manuscrit = false;
    // querysql = getFormattedQuery(sqlWorksCategory, filters);
    // const totalNoManusNoPrinted = await t.one(querysql);

    const totalAuthors = await t.one(sqlAuthorsCategory, category);

    const percentageManuscrits =
      (totalManuscrits.total / totalWorks.total) * 100;
    const percentagePrinted = (totalPrinted.total / totalWorks.total) * 100;

    // pasamos a las places
    filters.manuscrit = undefined;
    querysql = getFormattedQuery(sqlPlacesCategory, filters);
    const places = await t.any(querysql);

    const decades = await t.any(sqlCategoryDecades, category);

    const related_cats = await t.manyOrNone(sqlCategoryRelated, category);

    const concrete_authors = await t.manyOrNone(
      sqlCategoryConcreteAuthors,
      category
    );

    return {
      categoryName: categoryName.theme,
      totalWorks: +totalWorks.total,
      totalPrinted: +totalPrinted.total,
      totalManuscrits: +totalManuscrits.total,
      //      totalNoManusNoPrinted: +totalNoManusNoPrinted.total,
      totalAuthors: +totalAuthors.total,
      percentageManuscrits,
      percentagePrinted,
      places,
      decades,
      related_cats,
      concrete_authors,
    };
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  CategoryByID,
  CategoriesAll,
};
