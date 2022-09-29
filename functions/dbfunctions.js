// joder esto no funciona...
// import { pivotWider, tidy } from "@tidyjs/tidy";
const { pivotWider, tidy, groupBy, summarize, sum } = require("@tidyjs/tidy");

const initOptions = {};
const pgp = require("pg-promise")(initOptions);

username = process.env.PG_USER;
password = process.env.PG_PASSWORD;
pgport = process.env.PGPORT;

const db = pgp(
  `postgres://${username}:${password}@localhost:${pgport}/dominicos`
);

const monitor = require("pg-monitor");
monitor.attach(initOptions);

const { FilterSetGeneral, FilterSetProvinces, readSQL } = require("./helpers");

// Es necesario crearlo aquí globalmente y no en la función concreta
// por no sé cuestión interna...
const sqlBishopsPerCentury = readSQL("../sql/copenhagen/bishopspercentury.sql");
const sqlDioceseIndividualGeneral = readSQL(
  "../sql/copenhagen/individualdiocesegeneral.sql"
);
const sqlDioceseIndividualOrders = readSQL(
  "../sql/copenhagen/individualdioceseorders.sql"
);
const sqlPresenceOrders = readSQL("../sql/copenhagen/presenceorders.sql");
const sqlAbsenceOrdersAgg = readSQL("../sql/copenhagen/absenceorder_agg.sql");

const sqlPositonsAgg = readSQL("../sql/copenhagen/positions_agg.sql");

async function getGeneralData(req, res) {
  const sqlDioceses = await db.query(
    "SELECT COUNT(*) as total FROM general.dioceses"
  );

  const sqlBishops = await db.query(
    "SELECT COUNT(DISTINCT url) as total FROM vistas.b_cph_cs_sa"
  );

  const sqlBishopsOrders = await db.query(
    "SELECT COUNT(DISTINCT url) as total FROM vistas.b_cph_cs_sa WHERE religious_order IS NOT NULL"
  );

  res.send({
    sqlDioceses: sqlDioceses,
    sqlBishops: sqlBishops,
    sqlBishopsOrders: sqlBishopsOrders,
  });
}

async function getDioceses(req, res) {
  if (req.query.diocese == undefined) {
    const sqlDiocesesCombo = await db.query(
      "SELECT diocese_id, diocese_name FROM general.dioceses ORDER BY diocese_name"
    );

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

async function getDiocesesClusters(req, res) {
  const dioceses = await db.query(
    "SELECT * FROM vistas.related_dioceses_ops_cph"
  );

  const positionsaggregate = await db.query(sqlPositonsAgg);

  res.send({
    dioceses: dioceses,
    positionsaggregate: positionsaggregate,
  });
}

async function getOrders(req, res) {
  const ordersCombo = await db.query(
    "SELECT order_id, order_acronym || ' (' || order_name_english || ')' as ordername FROM general.religious_orders ORDER BY ordername"
  );

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

  const positionsaggregate = await db.query(sqlPositonsAgg);

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

async function getThemesDetails(req, res) {
  const theme = req.query.theme;

  // formateamos el SQL del file con lo que nos devuelve
  // la clase FilterSet de todos los parámetros de la query
  // var querysql = pgp.as.format(
  //   sqlFindResolutionsWithProvinces,
  //   new FilterSetProvinces(queryparams)
  // );
  const rowList = await db.query(sqlThemesDetails, theme);

  res.send(rowList);
}

async function getProvinces(req, res) {
  const rowList = await db.query(sqlProvinces);
  res.send(rowList);
}

async function getResolutionsWithFilters(req, res) {
  let rowList = [];
  const queryparams = req.query;

  // necesitamos convertir lo de themes en un array en el caso de q
  // no lo sea, que es cuando solo viene uno
  queryparams.theme = Array.isArray(queryparams.theme)
    ? queryparams.theme
    : [queryparams.theme];

  // console.log("Los parámetros son:", queryparams);
  // necesitamos pasar el elemento theme a un array de integers
  queryparams.theme = queryparams.theme.map((i) => parseInt(i));

  // formateamos el SQL del file con lo que nos devuelve
  // la clase FilterSet de todos los parámetros de la query
  var querysql = pgp.as.format(
    sqlFindResolutionsWithFilters,
    new FilterSetGeneral(queryparams)
  );
  console.log(querysql);
  rowList = await db.query(querysql);

  res.send(rowList);
}

// rtt esto repite mucha funcionalidad de lo anterior...
async function getResolutionsWithProvinces(req, res) {
  let rowList = [];
  const queryparams = req.query;

  // necesitamos convertir lo de themes en un array en el caso de q
  // no lo sea, que es cuando solo viene uno
  queryparams.province = Array.isArray(queryparams.province)
    ? queryparams.province
    : [queryparams.province];

  // necesitamos pasar el elemento theme a un array de integers
  queryparams.province = queryparams.province.map((i) => parseInt(i));
  // console.log("Los parámetros son:", queryparams);

  let j = new FilterSetProvinces(queryparams);
  console.log(j);
  // formateamos el SQL del file con lo que nos devuelve
  // la clase FilterSet de todos los parámetros de la query
  var querysql = pgp.as.format(
    sqlFindResolutionsWithProvinces,
    new FilterSetProvinces(queryparams)
  );
  rowList = await db.query(querysql);

  res.send(rowList);
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
};
