const { db, pgp } = require("../dbconnect");
const { FilterSetMinimo } = require("../helpers");

const {
  sqlWorksCategory,
  sqlAuthorsCategory,
  sqlPlacesCategory,
} = require("../readsqls");

// creamos una string de una query con los filtros q se le pasa
function getFormattedQuery(sql, filters) {
  const querysql = pgp.as.format(sql, new FilterSetMinimo(filters));

  return querysql;
}

function Authors(req, res) {
  const author = req.query.author;

  let filters = {};

  db.task("authors", async (t) => {
    filters.author = author;

    let querysql = getFormattedQuery(sqlWorksCategory, filters);
    const totalWorks = await t.one(querysql);

    return {
      totalWorks,
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
  Authors,
};
