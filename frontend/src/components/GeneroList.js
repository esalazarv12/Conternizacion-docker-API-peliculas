import React, { useEffect, useState } from "react";
import axios from "axios";
import GeneroForm from "./GeneroForm";

const API_URL = "http://localhost:4000/api/generos";

export default function GeneroList() {
  const [generos, setGeneros] = useState([]);
  const [selectedGenero, setSelectedGenero] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchGeneros = async () => {
    try {
      const res = await axios.get(API_URL);
      setGeneros(res.data);
    } catch (error) {
      console.error("Error al obtener géneros:", error);
    }
  };

  useEffect(() => {
    fetchGeneros();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este género?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchGeneros();
    } catch (error) {
      console.error("Error al eliminar género:", error);
    }
  };

  const handleEdit = (genero) => {
    setSelectedGenero(genero);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedGenero(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedGenero(null);
    setShowForm(false);
    fetchGeneros();
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Géneros</h2>
      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Agregar Género
      </button>

      {showForm && (
        <GeneroForm genero={selectedGenero} onClose={handleCloseForm} />
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Creado</th>
            <th>Actualizado</th>
            <th>Acciones</th>
          </tr>
        </thead>
    <tbody>
  {generos.map((g) => (
    <tr key={g._id}>
      <td>{g.nombre}</td>
      <td>{g.descripcion}</td>
      <td>
        <button
          className={`btn btn-sm ${
            g.estado === "Activo" ? "btn-success" : "btn-danger"
          }`}
          disabled
        >
          {g.estado}
        </button>
      </td>
      <td>{new Date(g.createdAt).toLocaleDateString()}</td>
      <td>{new Date(g.updatedAt).toLocaleDateString()}</td>
      <td>
        <div className="d-flex gap-2">
          <button
            className="btn btn-info btn-sm"
            onClick={() => handleEdit(g)}
          >
            Editar
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleDelete(g._id)}
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  ))}
  {generos.length === 0 && (
    <tr>
      <td colSpan="6" className="text-center">
        No hay géneros registrados
      </td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
}
