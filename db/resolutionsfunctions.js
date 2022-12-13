// we import all files with the functions and export an object
// with a name, so that i can have "domain names" for the functions

module.exports = {
  // bishops, actually we could make this more simple...
  edm: require("./functions/bishops/edm"),
};
