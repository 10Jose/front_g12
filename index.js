const express = require("express");
const conectarDB = require("./config/db");
const usuarioRoutes = require("./routes/usuarioRoutes");
const auth = require("./routes/auth"); 
const app = express();
const categoriasRouters = require("./routes/categoriasRouters");
const productosRouters = require("./routes/productosRouters");
const cors = require("cors");
app.use(express.json({extended: true}));

conectarDB();
//habilitamos los cors ya que estamos haciendo comunicacion de dos proyectos.
app.use(cors());
//rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", auth);
app.use("/api/categorias", categoriasRouters);
app.use("/api/productos", productosRouters);
app.use("/api/productos/actualizar", productosRouters);

app.listen(4000, () => {
    console.log("servidor corriendo en el puerto 4000")
});