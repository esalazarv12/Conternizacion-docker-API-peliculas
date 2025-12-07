import React, { useState, useEffect } from "react";
import api from "../services/api";

function PeliculaEditForm({ pelicula, onCancel, onPeliculaEditada }) {
  const [titulo, setTitulo] = useState(pelicula.titulo);
  const [descripcion, setDescripcion] = useState(pelicula.descripcion);
  const [año, setAño] = useState(pelicula.año);
  const [imagen, setImagen] = useState(pelicula.imagen);
  const [genero, setGenero] = useState(pelicula.genero?._id || "");
  const [director, setDirector] = useState(pelicula.director?._id || "");
  const [productora, setProductora] = useState(pelicula.productora?._id || "");
  const [tipo, setTipo] = useState(pelicula.tipo?._id || "");

  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

useEffect(() => {
  api.get("/generos?estado=activo").then((res) => setGeneros(res.data));
  api.get("/directores?estado=activo").then((res) => setDirectores(res.data));
  api.get("/productoras?estado=activo").then((res) => setProductoras(res.data));
  api.get("/tipos").then((res) => setTipos(res.data));
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/peliculas/${pelicula._id}`, {
        titulo,
        descripcion,
        año: Number(año),
        genero,
        director,
        productora,
        tipo,
        imagen,
      });

      onPeliculaEditada();
    } catch (error) {
      console.error("Error al editar película:", error);
      alert("No se pudo editar la película");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <h4 className="mb-3">Editar Película</h4>

      <div className="mb-2">
        <label className="form-label">Título</label>
        <input
          type="text"
          className="form-control"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Año</label>
        <input
          type="number"
          className="form-control"
          value={año}
          onChange={(e) => setAño(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Imagen (URL)</label>
        <input
          type="text"
          className="form-control"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Género</label>
        <select
          className="form-select"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        >
          <option value="">Seleccione un género</option>
          {generos.map((g) => (
            <option key={g._id} value={g._id}>
              {g.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="form-label">Director</label>
        <select
          className="form-select"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          required
        >
          <option value="">Seleccione un director</option>
          {directores.map((d) => (
            <option key={d._id} value={d._id}>
              {d.nombres}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="form-label">Productora</label>
        <select
          className="form-select"
          value={productora}
          onChange={(e) => setProductora(e.target.value)}
          required
        >
          <option value="">Seleccione una productora</option>
          {productoras.map((p) => (
            <option key={p._id} value={p._id}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="form-label">Tipo</label>
        <select
          className="form-select"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        >
          <option value="">Seleccione un tipo</option>
          {tipos.map((t) => (
            <option key={t._id} value={t._id}>
              {t.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex justify-content-between mt-3">
        <button type="submit" className="btn btn-primary">
          Guardar cambios
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default PeliculaEditForm;
