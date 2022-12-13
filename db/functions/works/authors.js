const { db, pgp } = require("../../dbconnect");
const { FilterSetMinimo } = require("../../helpers");

const {
  sqlAuthorsAll,
  sqlAuthorsById,
  sqlWorksCategory,
  sqlAuthorsByIdCategories,
  sqlPlacesCategory,
} = require("../../readsqls");

// creamos una string de una query con los filtros q se le pasa
function getFormattedQuery(sql, filters) {
  const querysql = pgp.as.format(sql, new FilterSetMinimo(filters));

  return querysql;
}

async function AuthorsAll(req, res) {
  try {
    const totalWorks = await db.many(sqlAuthorsAll);

    res.send(totalWorks);
  } catch (err) {
    console.log(err);
  }
}

function AuthorById(req, res) {
  //  const author = req.query.author;
  const author_id = req.params.id;

  if (author_id == null) {
    return;
  }

  db.task("authors", async (t) => {
    const persona = await t.one(sqlAuthorsById, author_id);
    const cats = await t.any(sqlAuthorsByIdCategories, author_id);

    return {
      persona,
      cats,
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
  AuthorById,
  AuthorsAll,
};
