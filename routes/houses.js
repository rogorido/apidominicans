const express = require("express");
const router = express.Router();

const dbfunctions = require("../db/dbgeneral");

router.get("/statistics/general/", dbfunctions.houses.houses.getGeneralData);
router.get("/houses/", dbfunctions.houses.houses.getHouses);
// para comboboxes y demás
router.get("/provinces/", dbfunctions.houses.houses.getProvinces);

module.exports = router;
