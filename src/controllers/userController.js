"use strict";

const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");
const jwt = require("../services/jwt");

function registrar(req, res) {
  const user = new User();
  const { nombre, usuario, password, email } = req.body;

  if ((nombre && usuario && password, email)) {
    user.nombre = nombre;
    user.usuario = usuario;
    user.email = email;

    User.find({
      $or: [{ usuario: user.usuario }, { email: user.email }],
    }).exec((err, usuario) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error en la petición de usuarios" });
      if (usuario && usuario.length >= 1) {
        return res.status(500).send({ message: "El usuario ya existe" });
      } else {
        bcrypt.hash(password, null, null, (err, hash) => {
          user.password = hash;

          user.save((err, usuarioGuardado) => {
            if (err)
              return res
                .status(500)
                .send({ message: "Error al guardar el usuario" });
            if (usuarioGuardado) {
              res.status(200).send({ user: usuarioGuardado });
            } else {
              res
                .status(404)
                .send({ message: "No se ha podido registar el usuario" });
            }
          });
        });
      }
    });
  } else {
    res.status(200).send({ message: "Complete todos los campos necesarios." });
  }
}

function login(req, res) {
  try {
    const { email, password, token } = req.body;
    User.findOne({ email: email }, (error, usuario) => {
      if (error) res.status(400).send({ message: "Bad Request" });
      if (usuario) {
        bcrypt.compare(password, usuario.password, (error, checked) => {
          if (error) res.status(500).send({ message: "Unexpected Error" });
          if (checked) {
            if (token) {
              res.status(200).send({
                message: "Usuario Logeado",
                token: jwt.createToken(usuario),
              });
            } else {
              usuario.password = undefined;
              res.status(200).send({ user: usuario });
            }
          } else {
            res
              .status(404)
              .send({ message: "El usuario no se ha podido identificar" });
          }
        });
      } else {
        res.status(404).send({ message: "Not Found" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
}

function editUser(req, res) {
  try {
    const { _id, nombre, email, usuario } = req.body;
    let updateUser = {};
    User.findOne({ _id: _id }).exec(async (error, userFinded) => {
      if (error) return res.status(400).send({ message: "Bad Request" });
      if (!userFinded) return res.status(404).send({ message: "Not Found" });

      if (nombre) updateUser.nombre = nombre;
      if (email) updateUser.email = email;
      if (usuario) updateUser.usuario = usuario;

      User.findByIdAndUpdate(
        _id,
        updateUser,
        { new: true },
        (error, updatedUser) => {
          if (error) return res.status(400).send({ message: "Bad Request" });
          if (!updatedUser)
            return res.status(404).send({ message: "Not Found" });
          return res
            .status(200)
            .send({ message: "Usuario Actualizado", user: updatedUser });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
}

function getUsers(req, res) {
  User.find((err, usuario) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });
    if (!usuario)
      return res
        .status(404)
        .send({ message: "Error en la consulta de usuarios" });
    return res.status(200).send({ usuario });
  });
}

function countUsers(req, res) {
  User.find((err, usuario) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });
    if (!usuario)
      return res
        .status(404)
        .send({ message: "Error en la consulta de usuarios" });
    return res.status(200).send({ message: `Total de Usuarios ${usuario}` });
  }).count();
}

function deleteUser(req, res) {
  const { _id } = req.body;

  try {
    User.findByIdAndDelete(_id, (error, deletedUser) => {
      if (error) return res.status(400).send({ message: "Bad Request" });
      if (!deleteUser) return res.status(404).send({ message: "Not Found" });
      return res
        .status(200)
        .send({ message: "Usuario Eliminado", user: deletedUser });
    });
  } catch (error) {
    console.error(error);
    return res.status5(500).send({ error: error.message });
  }
}

module.exports = {
  registrar,
  login,
  editUser,
  getUsers,
  countUsers,
  deleteUser,
};
