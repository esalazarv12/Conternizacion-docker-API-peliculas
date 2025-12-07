const Director = require("../models/directorModel");

// Obtener todos los directores activos
const getDirectores = async (req, res) => {
  try {
    const query = {};
    if (req.query.estado === "activo") {
      query.estado = "Activo";
    }
    const directores = await Director.find(query);
    res.json(directores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los directores" });
  }
};


// Crear un nuevo director
const createDirector = async (req, res) => {
  try {
    const { nombres, estado } = req.body;
    const nuevoDirector = new Director({ nombres, estado });
    await nuevoDirector.save();
    res.status(201).json(nuevoDirector);
  } catch (error) {
    console.error("Error al crear director:", error.message);
    res.status(400).json({ error: "Error al crear el director" });
  }
};

// Actualizar un director
const updateDirector = async (req, res) => {
  try {
    const { id } = req.params;
    const directorActualizado = await Director.findByIdAndUpdate(id, req.body, { new: true });
    if (!directorActualizado) {
      return res.status(404).json({ error: "Director no encontrado" });
    }
    res.json(directorActualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el director" });
  }
};

// Eliminar un director
const deleteDirector = async (req, res) => {
  try {
    const { id } = req.params;
    await Director.findByIdAndDelete(id);
    res.json({ mensaje: "Director eliminado" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el director" });
  }
};

module.exports = {
  getDirectores,
  createDirector,
  updateDirector,
  deleteDirector
};
