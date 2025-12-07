import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/api/productoras";

export default function ProductoraForm({ productora, onClose }) {
  const [formData, setFormData] = useState({
    nombre: productora?.nombre || "",
    slogan: productora?.slogan || "",
    descripcion: productora?.descripcion || "",
    estado: productora?.estado || "Activo",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productora) {
        await axios.put(`${API_URL}/${productora._id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      onClose();
    } catch (error) {
      console.error("Error al guardar productora:", error);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">
          {productora ? "Editar Productora" : "Nueva Productora"}
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
            <label className="form-label">Slogan</label>
            <input
              type="text"
              className="form-control"
              name="slogan"
              value={formData.slogan}
              onChange={handleChange}
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
