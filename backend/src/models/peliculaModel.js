const mongoose = require("mongoose");
const slugify = require("slugify");

const peliculaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    descripcion: { type: String, trim: true },
    año: { type: Number, required: true },

    genero: { type: mongoose.Schema.Types.ObjectId, ref: "Genero", required: true },
    director: { type: mongoose.Schema.Types.ObjectId, ref: "Director", required: true },
    productora: { type: mongoose.Schema.Types.ObjectId, ref: "Productora", required: true },
    tipo: { type: mongoose.Schema.Types.ObjectId, ref: "Tipo", required: true },
    imagen: { type: String, trim: true },

    slug: { type: String, unique: true }

  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


peliculaSchema.pre("save", function (next) {
  if (this.isModified("titulo")) {
    this.slug = slugify(this.titulo, { lower: true, strict: true });
  }
  next();
});


peliculaSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.titulo) {
    update.slug = slugify(update.titulo, { lower: true, strict: true });
  }
  next();
});

const Pelicula = mongoose.model("Pelicula", peliculaSchema);
module.exports = Pelicula;
