"use strict";

var express = require("express");
var UserController = require("../controllers/userController");
var md_auth = require("../middlewares/authentication");

//RUTAS
var api = express.Router();
api.post("/registrar", UserController.registrar);
api.get("/login", UserController.login);
api.put("/editUser", md_auth.ensureAuth, UserController.editUser);
api.get("/getUsers", md_auth.ensureAuth, UserController.getUsers);
api.get("/count", md_auth.ensureAuth, UserController.countUsers);
api.delete("/deleteUser", md_auth.ensureAuth, UserController.deleteUser);

module.exports = api;
