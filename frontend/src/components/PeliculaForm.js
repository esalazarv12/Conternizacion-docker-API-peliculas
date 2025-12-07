import React, { useState, useEffect } from "react";
import api from "../services/api";

function PeliculaForm({ onPeliculaCreada }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [año, setAño] = useState("");
  const [imagen, setImagen] = useState("");
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [genero, setGenero] = useState("");
  const [director, setDirector] = useState("");
  const [productora, setProductora] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
  api.get("/generos?estado=activo").then((res) => setGeneros(res.data));
  api.get("/directores?estado=activo").then((res) => setDirectores(res.data));
  api.get("/productoras?estado=activo").then((res) => setProductoras(res.data));
  api.get("/tipos").then((res) => setTipos(res.data));
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/peliculas", {
        titulo,
        descripcion,
        año,
        genero,
        director,
        productora,
        tipo,
        imagen,
      });

      setTitulo("");
      setDescripcion("");
      setAño("");
      setImagen("");
      setGenero("");
      setDirector("");
      setProductora("");
      setTipo("");

      onPeliculaCreada();
    } catch (error) {
      console.error("Error al crear película:", error);
      alert("No se pudo crear la película");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <h4 className="mb-3">Agregar Película</h4>

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
        <label className="form-label">Sinopsis</label>
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

      <button type="submit" className="btn btn-success mt-3">
        Guardar
      </button>
    </form>
  );
}

export default PeliculaForm;
