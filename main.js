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

fastify.listen({ port: process.env.PORT }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
