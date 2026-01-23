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

module.exports = {
  openapi: {
    openapi: "3.1.0",
    info: {
      title: "Rest API for Early Modern Dominican Order Project",
      description:
        "This is the REST API of the Early Modern Dominican Ordern (EMDO) database.<br>With these Web services you have direct access to the data of the EMDO database by using a software of your choice. This Web page also allows to test the provided services directly.",
      version: "0.1.0",
      termsOfService: "https://dominicans.georeligion.org/getdata",
      contact: {
        name: "Igor Sosa Mayor",
        email: "igor.sosa@eui.eu",
      },
      license: {
        name: "CC BY 4.0",
        url: "http://creativecommons.org/licenses/by/4.0/",
      },
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
