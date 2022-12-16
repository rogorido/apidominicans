const { db, pgp } = require("../../dbconnect");

const {
  sqlPlacesTotal,
  sqlPlacesbyIdCategories,
  sqlPlacesbyIdDecades,
  sqlPlacesbyIdOtherData,
  sqlFormats,
} = require("../../readsqls");

async function places(req, res) {
  if (req.params.id == undefined) {
    try {
      const places = await db.many(sqlPlacesTotal);
      res.send(places);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  } else {
    const place_id = req.params.id;

    db.task("place_by_id", async (t) => {
      const place_cats = await t.any(sqlPlacesbyIdCategories, place_id);
      const decades = await t.any(sqlPlacesbyIdDecades, place_id);

      const [place_name, coords, authors, noprintdata] = await t.multi(
        sqlPlacesbyIdOtherData,
        place_id
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
        res.send(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = {
  places,
};
