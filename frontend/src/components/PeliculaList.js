import React, { useEffect, useState } from "react";
import api from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import PeliculaForm from "./PeliculaForm";
import PeliculaEditForm from "./PeliculaEditForm";

function PeliculaList() {
  const [peliculas, setPeliculas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [peliculaEditando, setPeliculaEditando] = useState(null);


  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [filtros, setFiltros] = useState({
    genero: "",
    director: "",
    productora: "",
    tipo: "",
    año: ""
  });

  const cargarPeliculas = () => {
    const queryParams = new URLSearchParams();

    if (filtros.genero) queryParams.append("genero", filtros.genero);
    if (filtros.director) queryParams.append("director", filtros.director);
    if (filtros.productora) queryParams.append("productora", filtros.productora);
    if (filtros.tipo) queryParams.append("tipo", filtros.tipo);
    if (filtros.año) queryParams.append("año", filtros.año);

    api
      .get(`/peliculas?${queryParams.toString()}`)
      .then((res) => setPeliculas(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    cargarPeliculas();

    const fetchData = async () => {
      try {
        const [resGeneros, resDirectores, resProductoras, resTipos] =
          await Promise.all([
            api.get("/generos"),
            api.get("/directores"),
            api.get("/productoras"),
            api.get("/tipos"),
          ]);

        setGeneros(resGeneros.data);
        setDirectores(resDirectores.data);
        setProductoras(resProductoras.data);
        setTipos(resTipos.data);
      } catch (error) {
        console.error("Error al cargar datos de filtros:", error);
      }
    };

    fetchData();
  }, []);

  const eliminarPelicula = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta película?")) {
      try {
        await api.delete(`/peliculas/${id}`);
        cargarPeliculas();
      } catch (error) {
        console.error("Error eliminando la película:", error);
        alert("No se pudo eliminar la película.");
      }
    }
  };

  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const limpiarFiltros = () => {
    setFiltros({ genero: "", director: "", productora: "", tipo: "", año: "" });
    cargarPeliculas();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Catálogo de Películas</h2>
      <div className="card p-3 mb-4 shadow-sm">
        <h5 className="mb-3">Filtros</h5>
        <div className="row g-2">
          <div className="col-md-2">
            <select
              className="form-control"
              name="genero"
              value={filtros.genero}
              onChange={handleFiltroChange}
            >
              <option value="">-- Género --</option>
              {generos.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <select
              className="form-control"
              name="director"
              value={filtros.director}
              onChange={handleFiltroChange}
            >
              <option value="">-- Director --</option>
              {directores.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.nombres}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <select
              className="form-control"
              name="productora"
              value={filtros.productora}
              onChange={handleFiltroChange}
            >
              <option value="">-- Productora --</option>
              {productoras.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <select
              className="form-control"
              name="tipo"
              value={filtros.tipo}
              onChange={handleFiltroChange}
            >
              <option value="">-- Tipo --</option>
              {tipos.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              name="año"
              placeholder="Año"
              value={filtros.año}
              onChange={handleFiltroChange}
            />
          </div>

          <div className="col-md-2 d-flex">
            <button
              className="btn btn-primary me-2 flex-fill"
              onClick={cargarPeliculas}
            >
              Buscar
            </button>
            <button
              className="btn btn-secondary flex-fill"
              onClick={limpiarFiltros}
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
      <div className="mb-3 text-end">
        {!mostrarFormulario ? (
          <button
            className="btn btn-primary"
            onClick={() => setMostrarFormulario(true)}
          >
            Agregar nueva película
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={() => setMostrarFormulario(false)}
          >
            Cancelar
          </button>
        )}
      </div>

      {mostrarFormulario && (
        <div className="mb-4">
          <PeliculaForm onPeliculaCreada={cargarPeliculas} />
        </div>
      )}

      {peliculaEditando && (
        <div className="mb-4">
          <PeliculaEditForm
            pelicula={peliculaEditando}
            onCancel={() => setPeliculaEditando(null)}
            onPeliculaEditada={() => {
              setPeliculaEditando(null);
              cargarPeliculas();
            }}
          />
        </div>
      )}
      
      <div className="row">
        {peliculas.map((pelicula) => (
          <div className="col-md-4 mb-4" key={pelicula._id}>
            <div className="card h-100 shadow-sm">
              {pelicula.imagen && (
                <img
                  src={pelicula.imagen}
                  alt={pelicula.titulo}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
              )}

              <div className="card-body d-flex flex-column">
                <h4 className="card-title fw-bold">{pelicula.titulo}</h4>
                <p className="text-muted small">
                  URL: <code>{pelicula.slug}</code>
                </p>
                <p className="card-text">{pelicula.descripcion}</p>
                <ul className="list-unstyled flex-grow-1">
                  <li>
                    <strong>Género:</strong> {pelicula.genero?.nombre}
                  </li>
                  <li>
                    <strong>Director:</strong> {pelicula.director?.nombres}
                  </li>
                  <li>
                    <strong>Productora:</strong> {pelicula.productora?.nombre}
                  </li>
                  <li>
                    <strong>Tipo:</strong> {pelicula.tipo?.nombre}
                  </li>
                  <li>
                    <strong>Año:</strong> {pelicula.año}
                  </li>
                </ul>

                <div className="d-flex justify-content-end mt-auto gap-2">
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => setPeliculaEditando(pelicula)}>
                  Editar
                  </button>
                <button
                  className="btn btn-secondary btn-sm"
                    onClick={() => eliminarPelicula(pelicula._id)}
                  >
                  Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {peliculas.length === 0 && (
          <p className="text-center text-muted">No hay películas registradas.</p>
        )}
      </div>
    </div>
  );
}

export default PeliculaList;
