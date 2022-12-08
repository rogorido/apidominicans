const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

const dbfunctions = require("./db/dbgeneral");

const app = express();
app.use(morgan("tiny"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(compression());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 45, // 45 requests,
});

app.use(limiter);

// app.use(
//   cors({
//     origin: [
//       "https://www.georeligion.org",
//       "https://dbg.georeligion.org",
//       "https://open.georeligion.org",
//       "http://localhost:*",
//       "http://192.168.1.10:8080",
//     ],
//   })
// );

app.use(cors());

// devolvemos la versión de la API
app.get("/", (req, res) => {
  res.send({ version: process.env.npm_package_version });
});

app.get("/statistics/general/", dbfunctions.stats.mainPage);

app.get("/categories/", dbfunctions.cats.CategoriesAll);
app.get("/categories/:id", dbfunctions.cats.CategoryByID);

app.get("/places/", dbfunctions.places.places);
app.get("/places/:id", dbfunctions.places.places);
app.get("/authors/", dbfunctions.authors.AuthorsAll);
app.get("/authors/:id", dbfunctions.authors.AuthorById);

// console.log(process.env.npm_package_version);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});
