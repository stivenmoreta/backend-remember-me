const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();


// Configuracion del puerto
app.set("port", process.env.port || 4000);

//importacion de rutas
const usuarioRoutes = require("./routes/usuarios.routes")

//Middlewares
app.use(cors());
app.use(morgan("dev"))
app.use(express.json());

//rutas
app.use("/api/usuario", usuarioRoutes)


app.listen(app.get("port"));
console.log("Server on port", app.get("port"));
