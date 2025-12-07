const Pelicula = require("../models/peliculaModel");

// Obtener todas las películas con datos completos y filtros
const getPeliculas = async (req, res) => {
  try {
    const { genero, director, productora, tipo, año } = req.query;

    
    let filtros = {};

    if (genero) filtros.genero = genero;
    if (director) filtros.director = director;
    if (productora) filtros.productora = productora;
    if (tipo) filtros.tipo = tipo;
    if (año) filtros.año = año;

    const peliculas = await Pelicula.find(filtros)
      .populate("genero", "nombre")
      .populate("director", "nombres estado")
      .populate("productora", "nombre slogan descripcion estado")
      .populate("tipo", "nombre descripcion");

    res.json(peliculas);
  } catch (error) {
    console.error("Error al obtener películas:", error);
    res.status(500).json({ error: "Error al obtener las películas" });
  }
};

// Crear una pelicula
const createPelicula = async (req, res) => {
  try {
    const { titulo, descripcion, año, genero, director, productora, tipo, imagen } = req.body;

    const nuevaPelicula = new Pelicula({
      titulo,
      descripcion,
      año,
      genero,
      director,
      productora,
      tipo,
      imagen
    });

    await nuevaPelicula.save();
    res.status(201).json(nuevaPelicula);
  } catch (error) {
    console.error("Error al crear película:", error);
    res.status(400).json({ error: "Error al crear la película" });
  }
};

// Actualizar una pelicula
const updatePelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const peliculaActualizada = await Pelicula.findByIdAndUpdate(id, req.body, { new: true })
      .populate("genero", "nombre")
      .populate("director", "nombres estado")
      .populate("productora", "nombre slogan descripcion estado")
      .populate("tipo", "nombre descripcion");

    if (!peliculaActualizada) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    res.json(peliculaActualizada);
  } catch (error) {
    console.error("Error al actualizar película:", error);
    res.status(400).json({ error: "Error al actualizar la película" });
  }
};

// Eliminar una pelicula
const deletePelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const peliculaEliminada = await Pelicula.findByIdAndDelete(id);

    if (!peliculaEliminada) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    res.json({ mensaje: "Película eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar película:", error);
    res.status(500).json({ error: "Error al eliminar la película" });
  }
};

module.exports = {
  getPeliculas,
  createPelicula,
  updatePelicula,
  deletePelicula
};
