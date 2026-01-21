const { db, pgp } = require("../../db/dbconnect");

const sqls = require("../../helpers/readsqls/readsqls-philippines");

async function positionsAll(request, reply) {
  try {
    const [allPositions, positionsTime, positionsYears, positionsLessSpecific] =
      await db.multi(sqls.sqlPositions);
    return reply.status(200).send({
      allPositions,
      positionsTime,
      positionsYears,
      positionsLessSpecific,
    });
  } catch (err) {
    console.log(err);
    return reply.status(400).send(err);
  }
}

async function positionsId(request, reply) {
  console.log(request.params);
  const position = request.params.position;

  if (position == null || position == "") {
    return reply.status(500).send({ message: "No position" });
  }

  const positiontosend = `{"cargo": "${position}" }`;

  try {
    // const [allPositionsIdData] = await db.multi(sqls.sqlPositionsId, {
    //   position: position,
    // });
    const formattedSql = pgp.as.format(sqls.sqlPositionsId, position);

    console.log(formattedSql);
    const [
      allPositionsIdData,
      tableFlatPositionId,
      totalHousesPositionId,
      totalPlacesPositionId,
      totalMateriasPositionId,
    ] = await db.multi(sqls.sqlPositionsId, position);
    return reply.status(200).send({
      allPositionsIdData,
      tableFlatPositionId,
      totalHousesPositionId,
      totalPlacesPositionId,
      totalMateriasPositionId,
    });
  } catch (err) {
    console.log(err);
    return reply.status(400).send(err);
  }
}

module.exports = {
  positionsAll,
  positionsId,
};
