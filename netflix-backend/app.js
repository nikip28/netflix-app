import express from "express";

import bodyParser from "body-parser";
import cors from "cors";

import routes from "./src/routes";

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use("/", routes);

module.exports = app;
