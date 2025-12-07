const mongoose = require("mongoose");

const productoraSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    estado: { type: String, enum: ["Activo", "Inactivo"], default: "Activo" },
    slogan: { type: String, trim: true },
    descripcion: { type: String, trim: true }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        return ret;
      }
    },
    toObject: { virtuals: true }
  }
);

const Productora = mongoose.model("Productora", productoraSchema);
module.exports = Productora;
