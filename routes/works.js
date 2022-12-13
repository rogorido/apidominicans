const express = require("express");
const router = express.Router();

const dbfunctions = require("../db/dbgeneral");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/statistics/general/", dbfunctions.works.stats.mainPage);

router.get("/categories/", dbfunctions.works.cats.CategoriesAll);
router.get("/categories/:id", dbfunctions.works.cats.CategoryByID);

router.get("/places/", dbfunctions.works.places.places);
router.get("/places/:id", dbfunctions.works.places.places);
router.get("/authors/", dbfunctions.works.authors.AuthorsAll);
router.get("/authors/:id", dbfunctions.works.authors.AuthorById);

module.exports = router;
