const express = require("express");
const router = express.Router();
const {
  getTipos,
  createTipo,
  updateTipo,
  deleteTipo
} = require("../controllers/tipoController");

router.get("/", getTipos);
router.post("/", createTipo);
router.put("/:id", updateTipo);
router.delete("/:id", deleteTipo);

module.exports = router;
