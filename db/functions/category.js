const { db, pgp } = require("../dbconnect");
const { FilterSetMinimo } = require("../helpers");

const {
  sqlWorksCategory,
  sqlAuthorsCategory,
  sqlPlacesCategory,
  sqlCategoryDecades,
  sqlCategoryRelated,
  sqlCategoryConcreteAuthors,
} = require("../readsqls");

// creamos una string de una query con los filtros q se le pasa
function getFormattedQuery(sql, filters) {
  const querysql = pgp.as.format(sql, new FilterSetMinimo(filters));

  return querysql;
}

function summaryCat(req, res) {
  const category = req.query.category;

  let filters = {};

  db.task("cat-general", async (t) => {
    filters.theme = category;

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

    const totalAuthors = await t.one(sqlAuthorsCategory, category);

    const percentageManuscrits =
      (totalManuscrits.total / totalWorks.total) * 100;
    const percentagePrinted = (totalPrinted.total / totalWorks.total) * 100;

    // pasamos a las places
    filters.manuscrit = undefined;
    querysql = getFormattedQuery(sqlPlacesCategory, filters);
    const totalPlaces = await t.many(querysql);

    const totaldecades = await t.any(sqlCategoryDecades, category);

    const related_cats = await t.manyOrNone(sqlCategoryRelated, category);

    const concrete_authors = await t.manyOrNone(
      sqlCategoryConcreteAuthors,
      category
    );

    return {
      totalWorks,
      totalManuscrits,
      totalPrinted,
      totalAuthors,
      percentageManuscrits,
      percentagePrinted,
      totalPlaces,
      totaldecades,
      related_cats,
      concrete_authors,
    };
  })
    .then((data) => {
      //      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  summaryCat,
};
