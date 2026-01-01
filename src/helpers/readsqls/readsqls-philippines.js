const { readSQL } = require("../helpers");

// Es necesario crearlo aquí globalmente y no en la función concreta
// por no sé cuestión interna...
const sqlKeysUsed = readSQL("../sql/philippines/keys_used.sql");

module.exports = {
  sqlKeysUsed,
};
