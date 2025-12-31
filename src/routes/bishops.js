const { db } = require("../db/dbconnect");

const { pivotWider, tidy, groupBy, summarize, sum } = require("@tidyjs/tidy");

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
} = require("../helpers/readsqls/readsqls-bishops");

async function routes(fastify, options) {
  // no async here because we use db.task!
  fastify.get("/statistics/general/", async (request, reply) => {
    try {
      const [sqlDioceses, sqlBishops, sqlBishopsOrders] = await db.multi(
        sqlBishophsGeneralData,
      );

      return reply.status(200).send({
        sqlDioceses: +sqlDioceses[0].total,
        sqlBishops: +sqlBishops[0].total,
        sqlBishopsOrders: +sqlBishopsOrders[0].total,
      });
    } catch (err) {
      console.log(err);
      return reply.status(400).send(err);
    }
  });

  // TODO: esto rtt funciona?
  fastify.get("/dioceses/", async (request, reply) => {
    if (request.query.diocese == undefined) {
      const sqlDiocesesCombo = await db.many(sqlDiocesesList);

      return reply.status(200).send({
        dioceses_combo: sqlDiocesesCombo,
      });
    } else {
      const diocese = request.query.diocese;
      const sqlDiocese = await db.query(sqlDioceseIndividualGeneral, diocese);

      const sqlDioceseOrders = await db.query(
        sqlDioceseIndividualOrders,
        diocese,
      );
      return reply
        .status(200)
        .send({ diocese: sqlDiocese, dioceseorders: sqlDioceseOrders });
    }
  });

  // TODO: a partir de aquí hay q ver cómo está esto

  fastify.get("/dioceses/clusters/", async (request, reply) => {
    const dioceses = await db.query(
      "SELECT * FROM vistas.related_dioceses_ops_cph",
    );

    const positionsaggregate = await db.query(sqlPositionsAgg);

    return reply.status(200).send({
      dioceses: dioceses,
      positionsaggregate: positionsaggregate,
    });
  });

  fastify.get("/orders/", async (request, reply) => {
    var ordersCombo;

    if (request.query.bishops === "true") {
      ordersCombo = await db.query(
        `SELECT DISTINCT r.order_id, r.order_acronym || ' (' || r.order_name_english || ') ' as ordername
       FROM general.religious_orders r
       JOIN vistas.b_edm_ss_sa b USING (order_id)
       ORDER  BY ordername`,
      );
    } else {
      ordersCombo = await db.query(
        "SELECT order_id, order_acronym || ' (' || order_name_english || ')' as ordername FROM general.religious_orders ORDER BY ordername",
      );
    }
    return reply.status(200).send({
      orders_combo: ordersCombo,
    });
  });

  fastify.get("/orders/presence/", async (request, reply) => {
    const orderid = request.query.orderid;
    const ordersPresence = await db.query(sqlPresenceOrders, orderid);

    const ordersPresenceAggregate = tidy(
      ordersPresence,
      groupBy("country", [summarize({ total: sum("total") })]),
    );

    return reply.status(200).send({
      orderspresence: ordersPresence,
      orderspresenceaggregate: ordersPresenceAggregate,
    });
  });

  fastify.get("/orders/absence/", async (request, reply) => {
    const orderid = request.query.orderid;
    const ordersAbsence = await db.query(
      "SELECT * FROM order_absent_dioceses($1)",
      orderid,
    );

    const ordersAbsenceAggregate = await db.query(sqlAbsenceOrdersAgg, orderid);

    return reply.status(200).send({
      ordersabsence: ordersAbsence,
      ordersabsenceaggregate: ordersAbsenceAggregate,
    });
  });

  fastify.get("/positions/", async (request, reply) => {
    const positions = await db.query("SELECT * FROM vistas.periplo_cph_op");

    const positionsaggregate = await db.query(sqlPositionsAgg);

    return reply.status(200).send({
      positions: positions,
      positionsaggregate: positionsaggregate,
    });
  });

  fastify.get("/prueba/", async (request, reply) => {
    let rowList = await db.query(sqlBishopsPerCentury);

    rowList = tidy(
      rowList,
      pivotWider({
        namesFrom: "centuries",
        valuesFrom: "total",
        valuesFill: 0,
      }),
    );

    return reply.status(200).send({
      rowList,
    });
  });

  fastify.get("/orders/temporalseries/", async (request, reply) => {
    console.log(request.query);
    const orderid = request.query.orderid;
    const startdate = request.query.startdate;
    const enddate = request.query.enddate;

    const rowList = await db.query(sqlOrderTemporalSeries, [
      startdate,
      enddate,
      orderid,
    ]);

    return reply.status(200).send({
      temporalseries: rowList,
    });
  });

  // TODO: old getBishopsIndividuals...
  // TODO: this should be a task!
  fastify.get("/quehacer/", async (request, reply) => {
    const bishops = await db.query(
      "SELECT * FROM vistas.bishops_individuals_cph_op",
    );

    const bishopsmean = await db.query(
      "SELECT round(AVG(anos),2) FROM vistas.bishops_individuals_cph_op",
    );
    const bishopsstddev = await db.query(
      "SELECT round(STDDEV(anos),2) FROM vistas.bishops_individuals_cph_op",
    );

    return reply.status(200).send({
      bishops: bishops,
      bishopsmean: bishopsmean,
      bishopsstddev: bishopsstddev,
    });
  });
}

module.exports = routes;
