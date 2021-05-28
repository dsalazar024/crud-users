"use strict";

//VARIBLES GLOBALES
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

//CARGA DE RUTAS
var user_routes = require("./routes/userRoutes");

//MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//RUTAS
app.use("/api", user_routes);

//STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

//EXPORTACIONES
module.exports = app;
