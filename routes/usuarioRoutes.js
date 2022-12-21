const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const usuarioController = require("../controllers/usuariosController");

router.post(
    "/", usuarioController.crearUsuario
);
/*
router.get("/",(req, res) =>{
    res.json({msg:"desde router GET"});
});
router.post("/",(req, res) =>{
    res.json({msg:"desde router POST"});
});
router.put("/",(req, res) =>{
    res.json({msg:"desde router PUT"});
});
router.delete("/",(req, res) =>{
    res.json({msg:"desde router DELETE"});
});
*/
// definir las rutas
module.exports = router;