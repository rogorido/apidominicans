const express = require("express");
const router = express.Router();

const dbfunctions = require("../db/dbgeneral");

router.get("/statistics/general/", dbfunctions.bishops.edm.getGeneralData);
router.get("/prueba/", dbfunctions.bishops.edm.getBishopsPerCentury);
router.get("/dioceses/", dbfunctions.bishops.edm.getDioceses);
router.get("/dioceses/clusters/", dbfunctions.bishops.edm.getDiocesesClusters);

router.get("/orders/", dbfunctions.bishops.edm.getOrders);
router.get("/orders/presence/", dbfunctions.bishops.edm.getOrdersPresence);
router.get("/orders/absence/", dbfunctions.bishops.edm.getOrdersAbsence);
router.get(
  "/orders/temporalseries/",
  dbfunctions.bishops.edm.getOrdersTemporalSeries
);

router.get("/positions/", dbfunctions.bishops.edm.getBishopsPositions);

module.exports = router;
