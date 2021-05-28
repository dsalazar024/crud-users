"use strict";

const jwt = require("jwt-simple");
const moment = require("moment");

const secret = "password";

exports.createToken = function (user) {
  var payload = {
    sub: user._id,
    nombre: user.nombre,
    usuario: user.usuario,
    email: user.email,
    iat: moment().unix(),
    exp: moment().day(30, "days").unix(),
  };

  return jwt.encode(payload, secret);
};
