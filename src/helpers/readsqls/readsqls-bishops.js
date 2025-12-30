const { readSQL } = require("../helpers");

const sqlDiocesesList = readSQL("../sql/bishops/dioceseslist.sql");

const sqlBishophsGeneralData = readSQL(
  "../sql/bishops/edm/bishopsgeneraldata.sql"
);
const sqlBishopsPerCentury = readSQL(
  "../sql/bishops/edm/bishopspercentury.sql"
);

const sqlDioceseIndividualGeneral = readSQL(
  "../sql/bishops/edm/individualdiocesegeneral.sql"
);
const sqlDioceseIndividualOrders = readSQL(
  "../sql/bishops/edm/individualdioceseorders.sql"
);
const sqlPresenceOrders = readSQL("../sql/bishops/edm/presenceorders.sql");
const sqlAbsenceOrdersAgg = readSQL("../sql/bishops/edm/absenceorder_agg.sql");

const sqlOrderTemporalSeries = readSQL(
  "../sql/bishops/edm/ordertemporalseries.sql"
);

const sqlPositionsAgg = readSQL("../sql/bishops/edm/positions_agg.sql");

module.exports = {
  sqlDiocesesList,
  sqlBishophsGeneralData,
  sqlBishopsPerCentury,
  sqlDioceseIndividualGeneral,
  sqlDioceseIndividualOrders,
  sqlPresenceOrders,
  sqlAbsenceOrdersAgg,
  sqlOrderTemporalSeries,
  sqlPositionsAgg,
};
