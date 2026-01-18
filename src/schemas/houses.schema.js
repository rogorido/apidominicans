module.exports = {
  getAllHousesReponse: {
    $id: "getAllHousesResponse", // nombre interno (puede ser cualquier string)
    type: "array",
    items: {
      type: "object",
      properties: {
        house_id: { type: "integer" },
        housename: { type: "string" },
        provincia: { type: "string" },
        place: { type: "string" },
        country: { type: "string" },
        longitude: { type: "number" },
        latitude: { type: "number" },
      },
    },
  },
};
