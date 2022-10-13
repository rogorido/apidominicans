const { db, pgp } = require("../dbconnect");
// const { FilterSetGeneral, readSQL } = require("./helpers");

const {
  sqlStatisticsLanguages,
  sqlWorksWithoutThemes,
  sqlFormats,
} = require("../readsqls");

function mainPage(req, res) {
  db.task("stats-general", async (t) => {
    const totalWorks = await t.one(
      "SELECT COUNT(DISTINCT work_id) AS total FROM works"
    );

    const totalManuscrits = await t.one(
      "SELECT COUNT(DISTINCT work_id) as total FROM works WHERE manuscrit = TRUE"
    );

    const totalPrinted = await t.one(
      "SELECT COUNT(DISTINCT work_id) as total FROM works WHERE printed = TRUE"
    );

    const totalAuthors = await t.one(
      "SELECT COUNT(DISTINCT author_id) AS total FROM works"
    );

    const totalWorksWithoutThemes = await t.many(sqlWorksWithoutThemes);
    const totalLanguages = await t.many(sqlStatisticsLanguages);

    const percentageManuscrits =
      (totalManuscrits.total / totalWorks.total) * 100;
    const percentagePrinted = (totalPrinted.total / totalWorks.total) * 100;

    const totalFormats = await t.many(sqlFormats, {
      wheresql: pgp.as.format(""),
      // wheresql: pgp.as.format("where place_print_id = $1", 3),
    });

    return {
      totalWorks: +totalWorks.total,
      totalManuscrits: +totalManuscrits.total,
      totalPrinted: +totalPrinted.total,
      totalAuthors: +totalAuthors.total,
      percentageManuscrits,
      percentagePrinted,
      totalLanguages: totalLanguages,
      totalWorksWithoutThemes: +totalWorksWithoutThemes.total,
      totalFormats,
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
  mainPage,
};
