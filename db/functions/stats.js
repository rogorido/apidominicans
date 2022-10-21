const { db, pgp } = require("../dbconnect");

const {
  sqlStatisticsMainPage,
  sqlStatisticsLanguages,
  sqlWorksWithoutThemes,
  sqlFormats,
} = require("../readsqls");

function mainPage(req, res) {
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
  mainPage,
};
