const mongoose = require("mongoose");

const tipoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, trim: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Tipo = mongoose.model("Tipo", tipoSchema);


module.exports = Tipo;
