const { readSQL } = require("../helpers");

// Es necesario crearlo aquí globalmente y no en la función concreta
// por no sé cuestión interna...
const sqlStatsGeneral = readSQL("../sql/philippines/statsgeneral.sql");
const sqlKeysUsed = readSQL("../sql/philippines/keys_used.sql");

// persons
// TODO: esto de los births es un agregado. el otro es un total!
const sqlPersonsBirths = readSQL("../sql/philippines/persons_births.sql");
const sqlPersonsDeaths = readSQL("../sql/philippines/persons_deaths.sql");
const sqlPersonsResignations = readSQL("../sql/philippines/persons_quits.sql");

// missions
const sqlMissionsGeneral = readSQL("../sql/philippines/missions_travel.sql");

module.exports = {
  sqlStatsGeneral,
  sqlKeysUsed,
  sqlPersonsBirths,
  sqlPersonsDeaths,
  sqlPersonsResignations,
  sqlMissionsGeneral,
};
