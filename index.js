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

app.use(
  cors({
    origin: [
      "https://www.georeligion.org",
      "https://dbg.georeligion.org",
      "https://beta.georeligion.org",
      "https://dominicans.georeligion.org",
      "http://localhost:8000",
      "http://localhost:3000",
      "http://localhost:9000",
      "http://localhost:8080",
      "http://localhost:8081",
      "http://192.168.1.10:8080",
    ],
  })
);

app.use(cors());

// devolvemos la versión de la API
app.get("/", (req, res) => {
  res.send({ version: process.env.npm_package_version });
});

// WORKS
app.get("/works/statistics/general/", dbfunctions.works.stats.mainPage);

app.get("/works/categories/", dbfunctions.works.cats.CategoriesAll);
app.get("/works/categories/:id", dbfunctions.works.cats.CategoryByID);

app.get("/works/places/", dbfunctions.works.places.places);
app.get("/works/places/:id", dbfunctions.works.places.places);
app.get("/works/authors/", dbfunctions.works.authors.AuthorsAll);
app.get("/works/authors/:id", dbfunctions.works.authors.AuthorById);

// HOUSES
app.get(
  "/houses/statistics/general/",
  dbfunctions.houses.houses.getGeneralData
);
app.get("/houses/houses/", dbfunctions.houses.houses.getHouses);
// para comboboxes y demás
app.get("/houses/provinces/", dbfunctions.houses.houses.getProvinces);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});
