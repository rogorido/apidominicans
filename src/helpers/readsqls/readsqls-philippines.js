const { readSQL } = require("../helpers");

// Es necesario crearlo aquí globalmente y no en la función concreta
// por no sé cuestión interna...
const sqlStatsGeneral = readSQL("../sql/philippines/statsgeneral.sql");
const sqlKeysUsed = readSQL("../sql/philippines/keys_used.sql");

// persons
// TODO: esto de los births es un agregado. el otro es un total!
const sqlPersons = readSQL("../sql/philippines/persons.sql");
const sqlPersonsBirths = readSQL("../sql/philippines/persons_births.sql");
const sqlPersonsDeaths = readSQL("../sql/philippines/persons_deaths.sql");
const sqlPersonsResignations = readSQL("../sql/philippines/persons_quits.sql");

// this query is already avalaible for authors!
const sqlPersonbyId = readSQL("../sql/works/authors/authorbyid.sql");
const sqlPersonbyIdDetails = readSQL(
  "../sql/philippines/personbyid_details.sql",
);

const sqlPositions = readSQL("../sql/philippines/persons_positions.sql");

// missions
const sqlMissionsGeneral = readSQL("../sql/philippines/missions_travel.sql");

// other
// TODO: esto hay q cambiarlo si pongo más queries en ese fichero!
const sqlLanguages = readSQL("../sql/philippines/others.sql");

module.exports = {
  sqlStatsGeneral,
  sqlKeysUsed,
  sqlPersons,
  sqlPersonbyId,
  sqlPersonbyIdDetails,
  sqlPersonsBirths,
  sqlPersonsDeaths,
  sqlPersonsResignations,
  sqlMissionsGeneral,
  sqlPositions,
  sqlLanguages,
};
