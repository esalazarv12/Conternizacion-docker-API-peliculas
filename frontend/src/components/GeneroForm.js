import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/api/generos";

export default function GeneroForm({ genero, onClose }) {
  const [formData, setFormData] = useState({
    nombre: genero?.nombre || "",
    descripcion: genero?.descripcion || "",
    estado: genero?.estado || "Activo",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (genero) {
        await axios.put(`${API_URL}/${genero._id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      onClose();
    } catch (error) {
      console.error("Error al guardar género:", error);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">
          {genero ? "Editar Género" : "Nuevo Género"}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select
              className="form-select"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success me-2">
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
