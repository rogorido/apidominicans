const { db } = require("../../dbconnect");

const {
  sqlHousesGeneralData,
  sqlHousesProvinces,
  sqlHousesSocio,
} = require("../../readsqls");

async function getGeneralData(req, res) {
  const housesList = await db.many(sqlHousesGeneralData);

  res.send(housesList);
}

async function getHouses(req, res) {
  const housesList = await db.many(sqlHousesSocio);

  res.send(housesList);
}

async function getProvinces(req, res) {
  const rowList = await db.many(sqlHousesProvinces);
  res.send(rowList);
}

module.exports = {
  getGeneralData,
  getProvinces,
  getHouses,
};
