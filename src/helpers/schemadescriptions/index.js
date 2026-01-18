// route /houses/houses
const getAllHouses = {
  schema: {
    description: "Get list of all houses.",
    tags: ["admin"],
    response: {
      200: { $ref: "getAllHousesResponse" },
    },
  },
};

module.exports = { getAllHouses };
