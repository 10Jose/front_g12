const { json } = require("express");
const { restart } = require("nodemon");
const Categorias = require("../models/Categorias");

exports.obtenerCategoriaHome = async (req, res) => {
    try {
        const categoria = await Categorias.find();
        res.json({ categoria });
    } catch (error) {
        console.log(error);
    }
};

exports.obtenerCategoria = async (req, res) => {
    try {
        const categoria = await Categorias.find({ creador: req.usuario.id });
        res.json({ categoria });
    } catch (error) {
        console.log(error);
    }
};

exports.obtenerCategoriaId = async (req, res) => {
    const { id } = req.params
    try {
        const categoria = await Categorias.findById(id);
        res.json({ categoria });
    } catch (error) {
        console.log(error);
    }
};

exports.crearCategoria = async (req, res) => {
    //req: lee lo que viene de postman
    //res: le escribimos a postman
    try {
        const categoria = new Categorias(req.body);
        categoria.creador = req.usuario.id;
        categoria.save();
        res.json(categoria);
    } catch (error) {
        console.log(error);
    }

};
exports.actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const categoria = await Categorias.findById(id);
    if (!categoria) {
        return res.status(400).json({ msg: "categoria no encontrada" });
    }
    if (categoria.creador.toString() !== req.usuario.id.toString()) {
        return res.status(400).json({ msg: "acción no valida para este usuario" });
    }
    categoria.nombre = req.body.nombre || categoria.nombre;
    categoria.imagen = req.body.imagen || categoria.imagen;
    categoria.save();
    res.json({ categoria });
};
exports.borrarCategoria = async (req, res) => {
    const { id } = req.params;
    const categoria = await Categorias.findById(id);
    if (!categoria) {
        return res.status(400).json({ msg: "categoria no encontrada" });
    }


    try {
        await Categorias.deleteOne({ _id: req.params.id });
        res.json({ msg: "categoria eliminada" });
    } catch (error) {
        console.log(error);
    }
};