import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/api/tipos";

export default function TipoForm({ tipo, onClose }) {
  const [formData, setFormData] = useState({
    nombre: tipo?.nombre || "",
    descripcion: tipo?.descripcion || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tipo) {
        await axios.put(`${API_URL}/${tipo._id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      onClose();
    } catch (error) {
      console.error("Error al guardar tipo:", error);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">
          {tipo ? "Editar Tipo" : "Nuevo Tipo"}
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
              required
            />
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
