"use strict";

const mongoose = require("mongoose");
const app = require("./app");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/Blautech_Test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión correcta a la base de datos");

    app.set("port", process.env.PORT || 3000);
    app.listen(app.get("port"), () => {
      console.log(`El servidor esta corriendo en el puerto ${app.get("port")}`);
    });
  })
  .catch((err) => console.log(err));
