const Productora = require("../models/productoraModel");

// Obtener productoras mas filtro
const getProductoras = async (req, res) => {
  try {
    const query = {};
    if (req.query.estado === "activo") {
      query.estado = "Activo";
    }
    const productoras = await Productora.find(query);
    res.json(productoras);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las productoras" });
  }
};

// Crear una nueva productora
const createProductora = async (req, res) => {
  try {
    const { nombre, estado, slogan, descripcion } = req.body;
    const nuevaProductora = new Productora({ nombre, estado, slogan, descripcion });
    await nuevaProductora.save();
    res.status(201).json(nuevaProductora);
  } catch (error) {
    res.status(400).json({ error: "Error al crear la productora" });
  }
};

// Actualizar una productora
const updateProductora = async (req, res) => {
  try {
    const { id } = req.params;
    const productoraActualizada = await Productora.findByIdAndUpdate(id, req.body, { new: true });
    if (!productoraActualizada) {
      return res.status(404).json({ error: "Productora no encontrada" });
    }
    res.json(productoraActualizada);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar la productora" });
  }
};

// Eliminar una productora
const deleteProductora = async (req, res) => {
  try {
    const { id } = req.params;
    await Productora.findByIdAndDelete(id);
    res.json({ mensaje: "Productora eliminada" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar la productora" });
  }
};

module.exports = {
  getProductoras,
  createProductora,
  updateProductora,
  deleteProductora
};
