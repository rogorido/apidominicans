const express = require("express");
const router = express.Router();

const dbfunctions = require("../db/dbgeneral");

router.get("/generaldata/", dbfunctions.chaps.chaps.getGeneralData);
router.get("/themes/", dbfunctions.chaps.chaps.getThemesList);
router.get("/themes/stats/", dbfunctions.chaps.chaps.getThemesStats);
router.get("/themes/details/", dbfunctions.chaps.chaps.getThemesDetails);
router.get(
  "/themes/ordinationes/",
  dbfunctions.chaps.chaps.getThemesOrdinationes
);
router.get("/capgens/", dbfunctions.chaps.chaps.getCapGensStats);
router.get("/capgensperdecade/", dbfunctions.chaps.chaps.getChaptersPerDecade);
router.get("/capgensperplaces/", dbfunctions.chaps.chaps.getChaptersPerPlaces);
router.get(
  "/resolutions/stats/",
  dbfunctions.chaps.chaps.getResolutionsTypesStats
);
router.get(
  "/resolutions/lookagain/",
  dbfunctions.chaps.chaps.getResolutionsLookAgain
);
router.get(
  "/resolutions/adddata/",
  dbfunctions.chaps.chaps.getResolutionsAddData
);
router.get("/resolutions/", dbfunctions.chaps.chaps.getResolutionsWithFilters);
router.get(
  "/resolutionsperprovince/",
  dbfunctions.chaps.chaps.getResolutionsWithProvinces
);
router.get("/sufragios/stats/", dbfunctions.chaps.chaps.getSufragiosStats);
router.get("/penas/", dbfunctions.chaps.chaps.getPenasStats);

router.get("/provinces/stats", dbfunctions.chaps.chaps.getProvincesStats);
router.get("/provinces/details/", dbfunctions.chaps.chaps.getProvincesDetails);

router.get("/stats/retro", dbfunctions.chaps.chaps.getRetroStats);

router.get(
  "/approbations/general/",
  dbfunctions.chaps.chaps.getAprobationsStats
);
router.get(
  "/approbations/",
  dbfunctions.chaps.chaps.getAprobationsProvincesDetails
);

// para comboboxes y demás
router.get(
  "/houses/origin/",
  dbfunctions.chaps.chaps.getHousesOriginAffiliation
);
router.get(
  "/houses/destination/",
  dbfunctions.chaps.chaps.getHousesDestinationAffiliation
);
router.get("/licences/stats/", dbfunctions.chaps.chaps.getLicencesStats);
router.get("/prohibitions/", dbfunctions.chaps.chaps.getProhibitions);
router.get("/provinces/", dbfunctions.chaps.chaps.getProvinces);
router.get("/affiliations/", dbfunctions.chaps.chaps.getAffiliations);

module.exports = router;
