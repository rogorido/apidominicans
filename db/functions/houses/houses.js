const { db } = require("../../dbconnect");

const {
  sqlHousesGeneralData,
  sqlHousesProvinces,
  sqlHousesSocio,
} = require("../../readsqls/readsqls");

async function getGeneralData(req, res) {
  try {
    const housesList = await db.many(sqlHousesGeneralData);
    res.send(housesList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getHouses(req, res) {
  try {
    const housesList = await db.many(sqlHousesSocio);
    res.send(housesList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getProvinces(req, res) {
  try {
    const rowList = await db.many(sqlHousesProvinces);
    res.send(rowList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

module.exports = {
  getGeneralData,
  getProvinces,
  getHouses,
};
