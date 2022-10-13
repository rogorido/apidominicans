const { db, pgp } = require("../dbconnect");

const {
  sqlPlacesTotal,
  sqlPlacesbyIdCategories,
  sqlPlacesbyIdDecades,
  sqlPlacesbyIdOtherData,
  sqlFormats,
} = require("../readsqls");

async function places(req, res) {
  if (req.query.place_id == undefined) {
    const places = await db.many(sqlPlacesTotal);

    res.send(places);
  } else {
    const place_id = req.query.place_id;

    db.task("place_by_id", async (t) => {
      const place_cats = await t.any(sqlPlacesbyIdCategories, place_id);
      const place_dec = await t.any(sqlPlacesbyIdDecades, place_id);

      const [persons, noprintdata] = await t.multi(
        sqlPlacesbyIdOtherData,
        place_id
      );

      const totalFormats = await t.many(sqlFormats, {
        wheresql: pgp.as.format("where place_print_id = $1", place_id),
      });

      return {
        place_cats,
        place_dec,
        persons,
        noprintdata,
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
