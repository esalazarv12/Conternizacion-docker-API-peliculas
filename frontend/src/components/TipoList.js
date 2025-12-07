import React, { useEffect, useState } from "react";
import axios from "axios";
import TipoForm from "./TipoForm";

const API_URL = "http://localhost:4000/api/tipos";

export default function TipoList() {
  const [tipos, setTipos] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTipos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTipos(res.data);
    } catch (error) {
      console.error("Error al obtener tipos:", error);
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este tipo?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTipos();
    } catch (error) {
      console.error("Error al eliminar tipo:", error);
    }
  };

  const handleEdit = (tipo) => {
    setSelectedTipo(tipo);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedTipo(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedTipo(null);
    setShowForm(false);
    fetchTipos();
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Tipos</h2>
      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Agregar Tipo
      </button>

      {showForm && (
        <TipoForm tipo={selectedTipo} onClose={handleCloseForm} />
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Creado</th>
            <th>Actualizado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((t) => (
            <tr key={t._id}>
              <td>{t.nombre}</td>
              <td>{t.descripcion}</td>
              <td>{new Date(t.createdAt).toLocaleDateString()}</td>
              <td>{new Date(t.updatedAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => handleEdit(t)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleDelete(t._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {tipos.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No hay tipos registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
