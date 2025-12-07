
const express = require("express");
const router = express.Router();
const generoController = require("../controllers/generoController");

// Ruta para obtener todos los géneros
router.get("/", generoController.getGeneros);

// Ruta para crear un nuevo género
router.post("/", generoController.createGenero);

// Ruta para actualizar un género
router.put("/:id", generoController.updateGenero);

// Ruta para eliminar un género
router.delete("/:id", generoController.deleteGenero);

module.exports = router;
