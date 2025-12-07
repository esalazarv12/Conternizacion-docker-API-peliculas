const Tipo = require("../models/tipoModel");

// Obtener todos los tipos
const getTipos = async (req, res) => {
  try {
    const tipos = await Tipo.find();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los tipos" });
  }
};

// Crear un nuevo tipo
const createTipo = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevoTipo = new Tipo({ nombre, descripcion });
    await nuevoTipo.save();
    res.status(201).json(nuevoTipo);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el tipo" });
  }
};

// Actualizar un tipo
const updateTipo = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoActualizado = await Tipo.findByIdAndUpdate(id, req.body, { new: true });
    if (!tipoActualizado) {
      return res.status(404).json({ error: "Tipo no encontrado" });
    }
    res.json(tipoActualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el tipo" });
  }
};

// Eliminar un tipo
const deleteTipo = async (req, res) => {
  try {
    const { id } = req.params;
    await Tipo.findByIdAndDelete(id);
    res.json({ mensaje: "Tipo eliminado" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el tipo" });
  }
};

module.exports = {
  getTipos,
  createTipo,
  updateTipo,
  deleteTipo
};
