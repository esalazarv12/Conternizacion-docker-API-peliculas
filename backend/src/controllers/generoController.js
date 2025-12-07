const Genero = require("../models/generoModel");

// Crear género
exports.createGenero = async (req, res) => {
  try {
    const { nombre, descripcion, estado } = req.body;

    const nuevoGenero = new Genero({
      nombre,
      descripcion,
      estado,
    });

    await nuevoGenero.save();
    res.status(201).json(nuevoGenero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Obtener géneros activos
exports.getGeneros = async (req, res) => {
  try {
    const query = {};
    if (req.query.estado === "activo") {
      query.estado = "Activo";
    }
    const generos = await Genero.find(query);
    res.json(generos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los géneros" });
  }
};



// Actualizar género
exports.updateGenero = async (req, res) => {
  try {
    const { nombre, descripcion, estado } = req.body;

    const genero = await Genero.findByIdAndUpdate(
      req.params.id,
      { nombre, descripcion, estado },
      { new: true }
    );

    if (!genero) {
      return res.status(404).json({ error: "Género no encontrado" });
    }

    res.json(genero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar género
exports.deleteGenero = async (req, res) => {
  try {
    const genero = await Genero.findByIdAndDelete(req.params.id);
    if (!genero) {
      return res.status(404).json({ error: "Género no encontrado" });
    }
    res.json({ message: "Género eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


