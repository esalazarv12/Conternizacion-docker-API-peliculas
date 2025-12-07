
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PeliculaList from "./components/PeliculaList";
import GeneroList from "./components/GeneroList";
import DirectorList from "./components/DirectorList";
import ProductoraList from "./components/ProductoraList";
import TipoList from "./components/TipoList";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg custom-navbar">
          <div className="container">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link className="nav-link" to="/peliculas">Películas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/generos">Géneros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/directores">Directores</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productoras">Productoras</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tipos">Tipos</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/peliculas" element={<PeliculaList />} />
            <Route path="/generos" element={<GeneroList />} />
            <Route path="/directores" element={<DirectorList />} />
            <Route path="/productoras" element={<ProductoraList />} />
            <Route path="/tipos" element={<TipoList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
