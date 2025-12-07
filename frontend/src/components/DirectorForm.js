
import { useState, useEffect } from "react";

function DirectorForm({ onSubmit, onCancel, initialData }) {
  const [nombres, setNombres] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setNombres(initialData.nombres || "");
      setEstado(initialData.estado || "Activo");
    } else {
      setNombres("");
      setEstado("Activo");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombres.trim()) {
      alert("Por favor ingresa el nombre del director.");
      return;
    }

    try {
      setSaving(true);
      await onSubmit({ nombres: nombres.trim(), estado });
    } catch (err) {
    
      console.error("Error en onSubmit:", err);
      alert("Ocurrió un error al guardar. Revisa la consola.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body mb-3">
      <div className="mb-3">
        <label className="form-label">Nombres</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ej. Christopher Nolan"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Estado</label>
        <select
          className="form-select"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      <div className="d-flex">
        <button type="submit" className="btn btn-success me-2" disabled={saving}>
          {saving ? "Guardando..." : "Guardar"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={saving}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default DirectorForm;
