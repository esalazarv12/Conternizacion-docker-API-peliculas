const express = require("express");
const router = express.Router();
const {
  getPeliculas,
  createPelicula,
  updatePelicula,
  deletePelicula
} = require("../controllers/peliculaController");

router.get("/", getPeliculas);
router.post("/", createPelicula);
router.put("/:id", updatePelicula);
router.delete("/:id", deletePelicula);

module.exports = router;
