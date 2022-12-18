const { db } = require("../../dbconnect");
// joder esto no funciona...
// import { pivotWider, tidy } from "@tidyjs/tidy";
const { pivotWider, tidy, groupBy, summarize, sum } = require("@tidyjs/tidy");
// const { FilterSetGeneral, FilterSetProvinces } = require("../../helpers");

// Es necesario crearlo aquí globalmente y no en la función concreta
// por no sé cuestión interna...
const {
  sqlDiocesesList,
  sqlBishophsGeneralData,
  sqlBishopsPerCentury,
  sqlDioceseIndividualGeneral,
  sqlDioceseIndividualOrders,
  sqlPresenceOrders,
  sqlAbsenceOrdersAgg,
  sqlOrderTemporalSeries,
  sqlPositionsAgg,
} = require("../../readsqls/readsqls-bishops");

async function getGeneralData(req, res) {
  const [sqlDioceses, sqlBishops, sqlBishopsOrders] = await db.multi(
    sqlBishophsGeneralData
  );

  res.send({
    sqlDioceses: +sqlDioceses[0].total,
    sqlBishops: +sqlBishops[0].total,
    sqlBishopsOrders: +sqlBishopsOrders[0].total,
  });
}

async function getDioceses(req, res) {
  if (req.query.diocese == undefined) {
    const sqlDiocesesCombo = await db.many(sqlDiocesesList);

    res.send({
      dioceses_combo: sqlDiocesesCombo,
    });
  } else {
    const diocese = req.query.diocese;
    const sqlDiocese = await db.query(sqlDioceseIndividualGeneral, diocese);

    const sqlDioceseOrders = await db.query(
      sqlDioceseIndividualOrders,
      diocese
    );
    res.send({ diocese: sqlDiocese, dioceseorders: sqlDioceseOrders });
  }
}

// TODO: a partir de aquí hay q ver cómo está esto

async function getDiocesesClusters(req, res) {
  const dioceses = await db.query(
    "SELECT * FROM vistas.related_dioceses_ops_cph"
  );

  const positionsaggregate = await db.query(sqlPositionsAgg);

  res.send({
    dioceses: dioceses,
    positionsaggregate: positionsaggregate,
  });
}

async function getOrders(req, res) {
  var ordersCombo;

  if (req.query.bishops === "true") {
    ordersCombo = await db.query(
      `SELECT DISTINCT r.order_id, r.order_acronym || ' (' || r.order_name_english || ') ' as ordername
       FROM general.religious_orders r
       JOIN vistas.b_edm_ss_sa b USING (order_id)
       ORDER  BY ordername`
    );
  } else {
    ordersCombo = await db.query(
      "SELECT order_id, order_acronym || ' (' || order_name_english || ')' as ordername FROM general.religious_orders ORDER BY ordername"
    );
  }
  res.send({
    orders_combo: ordersCombo,
  });
}

async function getOrdersPresence(req, res) {
  const orderid = req.query.orderid;
  const ordersPresence = await db.query(sqlPresenceOrders, orderid);

  const ordersPresenceAggregate = tidy(
    ordersPresence,
    groupBy("country", [summarize({ total: sum("total") })])
  );

  res.send({
    orderspresence: ordersPresence,
    orderspresenceaggregate: ordersPresenceAggregate,
  });
}

async function getOrdersAbsence(req, res) {
  const orderid = req.query.orderid;
  const ordersAbsence = await db.query(
    "SELECT * FROM order_absent_dioceses($1)",
    orderid
  );

  const ordersAbsenceAggregate = await db.query(sqlAbsenceOrdersAgg, orderid);

  res.send({
    ordersabsence: ordersAbsence,
    ordersabsenceaggregate: ordersAbsenceAggregate,
  });
}

async function getBishopsPositions(req, res) {
  const positions = await db.query("SELECT * FROM vistas.periplo_cph_op");

  const positionsaggregate = await db.query(sqlPositionsAgg);

  res.send({
    positions: positions,
    positionsaggregate: positionsaggregate,
  });
}

async function getBishopsIndividuals(req, res) {
  const bishops = await db.query(
    "SELECT * FROM vistas.bishops_individuals_cph_op"
  );

  const bishopsmean = await db.query(
    "SELECT round(AVG(anos),2) FROM vistas.bishops_individuals_cph_op"
  );
  const bishopsstddev = await db.query(
    "SELECT round(STDDEV(anos),2) FROM vistas.bishops_individuals_cph_op"
  );

  res.send({
    bishops: bishops,
    bishopsmean: bishopsmean,
    bishopsstddev: bishopsstddev,
  });
}

async function getBishopsPerCentury(req, res) {
  let rowList = await db.query(sqlBishopsPerCentury);

  rowList = tidy(
    rowList,
    pivotWider({ namesFrom: "centuries", valuesFrom: "total", valuesFill: 0 })
  );

  res.send({
    rowList,
  });
}

async function getOrdersTemporalSeries(req, res) {
  console.log(req.query);
  const orderid = req.query.orderid;
  const startdate = req.query.startdate;
  const enddate = req.query.enddate;

  const rowList = await db.query(sqlOrderTemporalSeries, [
    startdate,
    enddate,
    orderid,
  ]);

  res.send({
    temporalseries: rowList,
  });
}

module.exports = {
  getGeneralData,
  getBishopsPerCentury,
  getDioceses,
  getDiocesesClusters,
  getOrders,
  getOrdersPresence,
  getOrdersAbsence,
  getBishopsPositions,
  getOrdersTemporalSeries,
  getBishopsIndividuals,
};
