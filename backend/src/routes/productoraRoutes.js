const express = require("express");
const router = express.Router();
const {
  getProductoras,
  createProductora,
  updateProductora,
  deleteProductora
} = require("../controllers/productoraController");

router.get("/", getProductoras);
router.post("/", createProductora);
router.put("/:id", updateProductora);
router.delete("/:id", deleteProductora);

module.exports = router;
