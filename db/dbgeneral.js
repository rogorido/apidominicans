// we import all files with the functions and export an object
// with a name, so that i can have "domain names" for the functions

// module.exports = {
//   // works
//   stats: require("./functions/stats"),
//   cats: require("./functions/category"),
//   authors: require("./functions/authors"),
//   places: require("./functions/places"),
// };

module.exports = {
  works: require("./worksfunctions"),
  houses: require("./housesfunctions"),
};
