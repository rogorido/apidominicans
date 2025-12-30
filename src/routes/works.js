const { db, pgp } = require("../db/dbconnect");
const { FilterSetMinimo } = require("../helpers/helpers");

const {
  sqlStatisticsMainPage,
  sqlStatisticsLanguages,
  sqlWorksWithoutThemes,
  sqlMainPageTotalPlaces,
  sqlAuthorsAll,
  sqlAuthorsById,
  sqlAuthorsByIdCategories,
  sqlPlacesTotal,
  sqlPlacesbyIdCategories,
  sqlPlacesbyIdDecades,
  sqlPlacesbyIdOtherData,
  sqlFormats,
  sqlCategoriesAll,
  sqlWorksCategory,
  sqlAuthorsCategory,
  sqlPlacesCategory,
  sqlCategoryDecades,
  sqlCategoryRelated,
  sqlCategoryConcreteAuthors,
} = require("../helpers/readsqls/readsqls");

// creamos una string de una query con los filtros q se le pasa
function getFormattedQuery(sql, filters) {
  const querysql = pgp.as.format(sql, new FilterSetMinimo(filters));
  return querysql;
}

async function routes(fastify, options) {
  // no async here because we use db.task!
  fastify.get("/statistics/general", (request, reply) => {
    db.task("stats-general", async (t) => {
      // multi returns an Array of arrays. Y por tnato luego tengo q coger
      // el primer elemento...
      const [totalWorks, totalManuscrits, totalPrinted, totalAuthors] =
        await t.multi(sqlStatisticsMainPage);

      const totalWorksWithoutThemes = await t.one(sqlWorksWithoutThemes);
      const totalLanguages = await t.many(sqlStatisticsLanguages);

      const percentageManuscrits =
        (totalManuscrits[0].total / totalWorks[0].total) * 100;
      const percentagePrinted =
        (totalPrinted[0].total / totalWorks[0].total) * 100;

      const totalFormats = await t.many(sqlFormats, {
        wheresql: pgp.as.format(""),
        // wheresql: pgp.as.format("where place_print_id = $1", 3),
      });

      const totalPlaces = await t.any(sqlMainPageTotalPlaces);

      return {
        totalWorks: +totalWorks[0].total,
        totalManuscrits: +totalManuscrits[0].total,
        totalPrinted: +totalPrinted[0].total,
        totalAuthors: +totalAuthors[0].total,
        percentageManuscrits,
        percentagePrinted,
        totalLanguages: totalLanguages,
        totalWorksWithoutThemes: +totalWorksWithoutThemes.total,
        totalFormats,
        totalPlaces,
      };
    })
      .then((data) => {
        return reply.send(data);
      })
      .catch((error) => {
        console.log(error);
        return reply.status(500).send(error);
      });
  });

  // TODO: we should merge these two routes into one.
  // but it is not so easy because of db.task and async!
  fastify.get("/authors", async (request, reply) => {
    try {
      const totalWorks = await db.many(sqlAuthorsAll);
      return totalWorks;
    } catch (err) {
      console.log(err);
      return err;
    }
  });

  fastify.get("/authors/:id", (request, reply) => {
    const author_id = request.params.id;

    if (author_id == null || author_id == "") {
      return reply.status(500).send({ message: "No author_id" });
    }

    db.task("authorbyid", async (t) => {
      const persona = await t.one(sqlAuthorsById, author_id);
      const cats = await t.any(sqlAuthorsByIdCategories, author_id);

      return {
        persona,
        cats,
      };
    })
      .then((data) => {
        return reply.send(data);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  });

  fastify.get("/places", async (request, reply) => {
    try {
      const places = await db.many(sqlPlacesTotal);
      return reply.status(200).send(places);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/places/:id", (request, reply) => {
    const place_id = request.params.id;

    if (place_id == null || place_id == "") {
      return reply.status(500).send({ message: "No place_id" });
    }

    db.task("place_by_id", async (t) => {
      const place_cats = await t.any(sqlPlacesbyIdCategories, place_id);
      const decades = await t.any(sqlPlacesbyIdDecades, place_id);

      const [place_name, coords, authors, noprintdata] = await t.multi(
        sqlPlacesbyIdOtherData,
        place_id,
      );

      const totalFormats = await t.many(sqlFormats, {
        wheresql: pgp.as.format("where place_print_id = $1", place_id),
      });

      // añadir otro de autores pero habría q dividirlo por los q son originales
      // y los q son reedciones

      return {
        place_name: place_name[0].place,
        place_cats,
        decades,
        coords,
        authors: authors[0].total,
        noprintdata: noprintdata[0],
        totalFormats,
      };
    })
      .then((data) => {
        return reply.send(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  fastify.get("/categories", async (request, reply) => {
    try {
      const categories = await db.many(sqlCategoriesAll);
      return reply.status(200).send(categories);
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  fastify.get("/categories/:id", (request, reply) => {
    const category = request.params.id;

    if (category == null || category == "") {
      return reply.status(500).send({ message: "No category" });
    }

    let filters = {};

    db.task("cat-general", async (t) => {
      filters.theme = category;

      const categoryName = await t.one(
        "SELECT theme FROM themes WHERE theme_id = $1",
        category,
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
        category,
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
        return reply.status(200).send(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

module.exports = routes;
