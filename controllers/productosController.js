const Productos = require("../models/Productos");
const Categorias = require("../models/Categorias");

exports.obtenerProductosHome = async (req, res) => {
    try {
        const productos = await Productos.find();
        res.json({ productos});
    } catch (error) {
        console.log(error);
    }
};


exports.obtenerProducto = async (req, res) => {
    const { id } = req.params
    const producto = await Productos.find().where("categoriaId").equals(id);
    res.json(producto);

};


exports.obtenerProductoId = async (req, res) => {
    const { id } = req.params
    try {
        const producto = await Productos.findById(id);
        res.json({ producto });
    } catch (error) {
        console.log(error);
    };
};



exports.crearProducto = async (req, res) => {
    // req: lee lo que viene del postman.
    // res: le escribimos al postman.
    const { categoriaId } = req.body;
    try {
        //const encontrarcategoria = await Categorias.findById(categoriaId);
        //console.log(encontrarcategoria);
        const producto = new Productos(req.body);
        //producto.creador = req.usuario.id;
        producto.save();
        res.json(producto);
    } catch (error) {
        console.log(error);

    }
};
exports.actualizarProducto = async (req, res) => {
    // req: lee lo que viene del postman.
    // res: le escribimos al postman.
    const { id } = req.params;
    const producto = await Productos.findById(id);
    if (!producto) {
        return res.status(400).json({ msg: "producto no encontrado" });
    }
    /*
     if (producto.creador.toString() !== req.usuario.id.toString()) {
         return res.status(400).json({ msg: "acción no valida para este usuario" });
     }*/
    producto.nombre = req.body.nombre || producto.nombre;
    producto.descripcion = req.body.descripcion || producto.descripcion;
    producto.stock = req.body.stock || producto.stock;
    producto.precio = req.body.precio || producto.precio;
    producto.imagen = req.body.imagen || producto.imagen;
    producto.save();
    res.json({ producto });
};
exports.borrarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Productos.findById(id)
    if (!producto) {
        return res.status(400).json({ msg: "Producto no encontrado" });
    }

    try {
        await Productos.deleteOne({ _id: req.params.id });
        res.json({ msg: "Producto eliminado" });
    } catch (error) {
        console.log(error);
    }
};