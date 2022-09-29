const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();
const dbFunctions = require("./functions/dbfunctions");

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

// app.get("/generaldata/", dbFunctions.getGeneralData);
// app.get("/prueba/", dbFunctions.getBishopsPerCentury);
// app.get("/dioceses/", dbFunctions.getDioceses);
// app.get("/dioceses/clusters/", dbFunctions.getDiocesesClusters);

// app.get("/orders/", dbFunctions.getOrders);
// app.get("/orders/presence/", dbFunctions.getOrdersPresence);
// app.get("/orders/absence/", dbFunctions.getOrdersAbsence);
// app.get("/orders/temporalseries/", dbFunctions.getOrdersTemporalSeries);

// app.get("/bishops/positions/", dbFunctions.getBishopsPositions);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});
