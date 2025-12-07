import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductoraForm from "./ProductoraForm";

const API_URL = "http://localhost:4000/api/productoras";

export default function ProductoraList() {
  const [productoras, setProductoras] = useState([]);
  const [selectedProductora, setSelectedProductora] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProductoras = async () => {
    try {
      const res = await axios.get(API_URL);
      setProductoras(res.data);
    } catch (error) {
      console.error("Error al obtener productoras:", error);
    }
  };

  useEffect(() => {
    fetchProductoras();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta productora?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProductoras();
    } catch (error) {
      console.error("Error al eliminar productora:", error);
    }
  };

  const handleEdit = (productora) => {
    setSelectedProductora(productora);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedProductora(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedProductora(null);
    setShowForm(false);
    fetchProductoras();
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Productoras</h2>
      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Agregar Productora
      </button>

      {showForm && (
        <ProductoraForm
          productora={selectedProductora}
          onClose={handleCloseForm}
        />
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Eslogan</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Creado</th>
            <th>Actualizado</th>
            <th>Acciones</th>
          </tr>
        </thead>
      <tbody>
          {productoras.map((p) => (
          <tr key={p._id}>
          <td>{p.nombre}</td>
          <td>{p.slogan}</td>
          <td>{p.descripcion}</td>
          <td>
            <button
              className={`btn btn-sm ${
              p.estado === "Activo" ? "btn-success" : "btn-danger"
              }`}
              disabled
            >
            {p.estado}
          </button>
          </td>
          <td>{new Date(p.createdAt).toLocaleDateString()}</td>
          <td>{new Date(p.updatedAt).toLocaleDateString()}</td>
          <td>
            <div className="d-flex gap-2">
              <button
                className="btn btn-info btn-sm"
                onClick={() => handleEdit(p)}
              >
                Editar
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handleDelete(p._id)}
              >
                Eliminar
              </button>
            </div>
          </td>
        </tr>
    ))}
      {productoras.length === 0 && (
        <tr>
          <td colSpan="7" className="text-center">
            No hay productoras registradas
          </td>
        </tr>
      )}
    </tbody>

      </table>
    </div>
  );
}
