// route /houses/houses
const getAllHouses = {
  schema: {
    description: "Get list of all houses.",
    tags: ["houses"],
    response: {
      200: { $ref: "getAllHousesResponse" },
    },
  },
};

// route /houses/provinces
const getHousesProvinces = {
  schema: {
    description: "Get list of all houses.",
    tags: ["houses"],
    response: {
      200: { $ref: "getHousesProvincesResponse" },
    },
  },
};

module.exports = { getAllHouses, getHousesProvinces };
