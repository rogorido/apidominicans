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

// app.use(cors());

// devolvemos la versión de la API
app.get("/", (req, res) => {
  res.send({ version: process.env.npm_package_version });
});

// WORKS
const works = require("./routes/works");
app.use("/works", works);

// HOUSES
app.get(
  "/houses/statistics/general/",
  dbfunctions.houses.houses.getGeneralData
);
app.get("/houses/houses/", dbfunctions.houses.houses.getHouses);
// para comboboxes y demás
app.get("/houses/provinces/", dbfunctions.houses.houses.getProvinces);

// BISHOPS
app.get("/bishops/statistics/general/", dbfunctions.bishops.edm.getGeneralData);
app.get("/bishops/prueba/", dbfunctions.bishops.edm.getBishopsPerCentury);
app.get("/bishops/dioceses/", dbfunctions.bishops.edm.getDioceses);
app.get(
  "/bishops/dioceses/clusters/",
  dbfunctions.bishops.edm.getDiocesesClusters
);

app.get("/bishops/orders/", dbfunctions.bishops.edm.getOrders);
app.get("/bishops/orders/presence/", dbfunctions.bishops.edm.getOrdersPresence);
app.get("/bishops/orders/absence/", dbfunctions.bishops.edm.getOrdersAbsence);
app.get(
  "/bishops/orders/temporalseries/",
  dbfunctions.bishops.edm.getOrdersTemporalSeries
);

app.get("/bishops/positions/", dbfunctions.bishops.edm.getBishopsPositions);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});
