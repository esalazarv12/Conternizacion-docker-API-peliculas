const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema(
  {
    nombres: { type: String, required: true, trim: true },
    estado: {
      type: String,
      enum: ["Activo", "Inactivo"],
      default: "Activo"
    }
  },
  {
    timestamps: true, // Crea createdAt y updatedAt automáticos
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        return ret;
      }
    },
    toObject: { virtuals: true }
  }
);

const Director = mongoose.model("Director", directorSchema);

module.exports = Director;
