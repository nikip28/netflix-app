import express from "express";
import publicRoutes from "./public";

const app = express();

/* public routes */
app.use("/", publicRoutes);

module.exports = app;
