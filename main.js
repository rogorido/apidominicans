const fastify = require("fastify")({ logger: { level: "info" } });

const helmet = require("@fastify/helmet");

require("dotenv").config();

// no sé por qué las jodidas peticiiones piden un favicon. Con esto
// evitamos en el log q ponga que no existe.
fastify.addHook("onRequest", (request, reply, done) => {
  if (request.url === "/favicon.ico") {
    reply.code(204).send();
  } else {
    done();
  }
});

// el asunto es este: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
// cuando hace un POST realmente pregunta antes al servidor con el método OPTIONS...
fastify.register(require("@fastify/cors"), {
  origin: ["http://localhost:3000"],
  methods: "GET,POST,OPTIONS",
});

fastify.register(require("@fastify/swagger"), {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "Test swagger",
      description: "Testing the Fastify swagger API",
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
    components: {},
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
  },
});

fastify.register(require("@fastify/swagger-ui"), {
  routePrefix: "/docs-ui",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
});

fastify.route({
  method: "GET",
  url: "/health",
  config: { cors: false }, // <-- desactiva CORS solo para esta ruta
  handler: async (req, reply) => {
    return { status: "ok", timestamp: Date.now() };
  },
});

fastify.register(require("@fastify/rate-limit"), {
  max: 180,
  timeWindow: "1 minute",
});

// We declare a route
fastify.register(require("./src/routes/general"), { prefix: "/general" });
fastify.register(require("./src/routes/works"), { prefix: "/works" });
fastify.register(require("./src/routes/houses"), { prefix: "/houses" });
fastify.register(require("./src/routes/resolutions"), { prefix: "/chapters" });
fastify.register(require("./src/routes/bishops"), { prefix: "/bishops" });
fastify.register(require("./src/routes/philippines"), {
  prefix: "/philippines",
});

fastify.listen({ port: process.env.PORT }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
//fastify.swagger();
