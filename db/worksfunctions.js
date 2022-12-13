// we import all files with the functions and export an object
// with a name, so that i can have "domain names" for the functions

module.exports = {
  // works
  stats: require("./functions/works/stats"),
  cats: require("./functions/works/category"),
  authors: require("./functions/works/authors"),
  places: require("./functions/works/places"),
};
