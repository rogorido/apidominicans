module.exports = {
  openapi: {
    openapi: "3.1.0",
    info: {
      title: "Rest API for Early Modern Dominican Order Project",
      description:
        "Documentation for the Application Programming Interfaces apidominicans.",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:8001",
        description: "Development server",
      },
    ],
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
