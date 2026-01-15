module.exports = {
  description: "Getting the version of the API",
  tags: ["admin"],
  response: {
    201: {
      type: "object",
      properties: {
        version: { type: "string" },
      },
    },
  },
};
