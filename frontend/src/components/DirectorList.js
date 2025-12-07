
import { useEffect, useState } from "react";
import api from "../services/api";
import DirectorForm from "./DirectorForm";

function DirectorList() {
  const [directores, setDirectores] = useState([]);
  const [editando, setEditando] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchDirectores();
  }, []);

  const fetchDirectores = async () => {
    try {
      const response = await api.get("/directores");
      setDirectores(response.data);
    } catch (error) {
      console.error("Error al cargar directores:", error);
      alert("No se pudieron cargar los directores. Revisa la consola.");
    }
  };

  // Crear director
  const handleCrear = async (data) => {
    try {
      await api.post("/directores", data);
      await fetchDirectores();
      setShowForm(false); 
    } catch (error) {
      console.error("Error al crear director:", error);
      
      const msg = error?.response?.data?.error || error?.message || "Error al crear director";
      alert(msg);
      throw error; 
    }
  };

  // Editar director
  const handleEditar = async (data) => {
    try {
      if (!editando || !editando._id) return;
      await api.put(`/directores/${editando._id}`, data);
      await fetchDirectores();
      setEditando(null);
    } catch (error) {
      console.error("Error al editar director:", error);
      const msg = error?.response?.data?.error || error?.message || "Error al editar director";
      alert(msg);
    }
  };

  // Eliminar director
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este director?")) return;
    try {
      await api.delete(`/directores/${id}`);
      fetchDirectores();
    } catch (error) {
      console.error("Error al eliminar director:", error);
      alert("No se pudo eliminar el director. Revisa la consola.");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Lista de Directores</h2>
        
        {!showForm ? (
          <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditando(null); }}>
            Agregar nuevo director
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
            Cancelar creación
          </button>
        )}
      </div>

      
      {editando ? (
        <DirectorForm
          initialData={editando}
          onSubmit={handleEditar}
          onCancel={() => setEditando(null)}
        />
      ) : (
        showForm && (
          <DirectorForm
            onSubmit={handleCrear}
            onCancel={() => setShowForm(false)}
          />
        )
      )}

      
      <ul className="list-group">
        {directores.map((director) => (
          <li
            key={director._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
  <strong>{director.nombres}</strong>{" "}
  <span
    className={`badge ms-2 ${
      director.estado === "Activo" ? "bg-success" : "bg-danger"
    }`}
  >
    {director.estado}
  </span>
  <br />
  <small>
    Creado: {new Date(director.createdAt).toLocaleDateString()} |{" "}
    Actualizado: {new Date(director.updatedAt).toLocaleDateString()}
  </small>
</div>


            <div>
              <button
                type="button"
                className="btn btn-info btn-sm me-2"
                onClick={() => {
                  setEditando(director);
                  setShowForm(false);
                }}
              >
                Editar
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleEliminar(director._id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DirectorList;
