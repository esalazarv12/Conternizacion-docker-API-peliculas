const mongoose = require("mongoose");

const GeneroSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    estado: {
      type: String,
      enum: ["Activo", "Inactivo"],
      default: "Activo",
    },
  },
  { timestamps: true }
);

const Genero = mongoose.model("Genero", GeneroSchema);
module.exports = Genero;
