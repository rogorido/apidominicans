require("dotenv").config();

function getServers() {
  const env = process.env.NODE_ENV || "development";

  if (env === "production") {
    return [
      {
        url: process.env.PROD_SERVER_OPENAPI,
        description: "Production server",
      },
    ];
  }

  // caso default: development
  return [
    {
      url: process.env.DEV_SERVER_OPENAPI,
      description: "Development server",
    },
  ];
}

const jodienda = getServers();

console.log("el valor es", process.env.PROD_SERVER_OPENAPI);
console.log("jodienda es", jodienda);

module.exports = {
  openapi: {
    openapi: "3.1.0",
    info: {
      title: "Rest API for Early Modern Dominican Order Project",
      description:
        "Documentation for the Application Programming Interfaces apidominicans.",
      version: "0.1.0",
    },
    servers: getServers(),
    tags: [
      { name: "user", description: "User related end-points" },
      { name: "admin", description: "Admin end-points" },
    ],
    components: {
      schemas: {}, // Fastify swagger will add here the schemas already declared.
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
  },
};
