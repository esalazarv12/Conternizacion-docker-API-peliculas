const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));



const generoRoutes = require('./routes/generoRoutes');
app.use('/api/generos', generoRoutes);

const peliculaRoutes = require("./routes/peliculaRoutes");
app.use("/api/peliculas", peliculaRoutes);

const tipoRoutes = require("./routes/tipoRoutes");
app.use("/api/tipos", tipoRoutes);

const directorRoutes = require("./routes/directorRoutes");
app.use("/api/directores", directorRoutes);

const productoraRoutes = require("./routes/productoraRoutes");
app.use("/api/productoras", productoraRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Películas 🎬. Usa /api/peliculas, /api/generos, etc.");
});

app.get("/api", (req, res) => {
  res.send("Bienvenido a la API de Películas 🎬. Usa /api/peliculas, /api/generos, etc.");
});



// Ruta de prueba
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
