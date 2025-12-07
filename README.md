# Aplicación Web de Gestión de Películas (Proyecto IUDigital)

# Descripción del Proyecto

La Institución Universitaria Digital de Antioquia requiere una aplicación web tipo plataforma de películas donde los administradores puedan gestionar películas, series y toda su información asociada.
El objetivo es proporcionar un sistema similar a Cuevana (pero legal), donde la Universidad agregará contenido con licencias válidas.

La aplicación se desarrolló con una arquitectura monolítica, compuesta por:

Backend: Node.js + Express + MongoDB
Frontend: React
Contenedorización: Docker y Docker Compose

No se incluye autenticación, registro de usuarios ni seguridad de acceso

# Módulos desarrollados

Género
Permite registrar, listar, editar y activar/inactivar los géneros.
Campos: nombre, estado, fechas, descripción.

Director
Permite gestionar directores.
Campos: nombres, estado y fechas.

Productora
Permite registrar productoras como Disney, Warner, etc.

Tipo
Gestiona si el contenido es película o serie.

Media (Películas/Series)
Administra todas las producciones.
Incluye información general y selección de género, director, productora y tipo activos.

Cada módulo cuenta con su model, controller y route en el backend, y con formulario y listados en el frontend.

# Tecnologías utilizadas

Backend
Node.js
Express
MongoDB + Mongoose
Dotenv
Frontend
React
Fetch API / Services
CSS
Contenedorización
Docker
Dockerfiles para frontend y backend
Docker Compose
Docker Desktop

# Estructura del src del backend:

backend/
 └── src/
      ├── controllers/
      │     ├── directorController.js
      │     ├── generoController.js
      │     ├── peliculaController.js
      │     ├── productoraController.js
      │     └── tipoController.js
      ├── models/
      │     ├── DirectorModel.js
      │     ├── GeneroModel.js
      │     ├── PeliculaModel.js
      │     ├── ProductoraModel.js
      │     └── TipoModel.js
      ├── routes/
      │     ├── directorRoutes.js
      │     ├── generoRoutes.js
      │     ├── peliculaRoutes.js
      │     ├── productoraRoutes.js
      │     └── tipoRoutes.js
      ├── app.js
      └── server.js

# Estructura del src del frontend:

frontend/
 └── src/
      ├── components/
      │     ├── directorForm.js
      │     ├── directorList.js
      │     ├── generoForm.js
      │     ├── generoList.js
      │     ├── peliculaForm.js
      │     ├── peliculaEditForm.js
      │     ├── peliculaList.js
      │     ├── productoraForm.js
      │     ├── productoraList.js
      │     ├── tipoForm.js
      │     └── tipoList.js
      ├── pages/
      │     ├── directorPage.js
      │     ├── peliculaPage.js
      │     ├── generoPage.js
      │     ├── tipoPage.js
      │     └── productoraPage.js
      ├── services/
      │     └── api.js
      ├── App.js
      └── App.css

# Contenerización con Docker

El proyecto incluye:

Dockerfile del backend
Dockerfile del frontend
.dockerignore para ambos componentes
docker-compose.yml para levantar el sistema completo

# Levantamiento del sistema

`docker compose build`
`docker compose up -d`

El backend quedará expuesto en: http://localhost:4000

El frontend quedará disponible en: http://localhost:3000
