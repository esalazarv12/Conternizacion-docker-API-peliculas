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

# Instalación manual (sin Docker)

para el backend abrir la terminal y poner:

`cd backend`
`npm install`
`npm run dev`

para el frontend abrir la terminal y poner:

`cd frontend`
`npm install`
`npm start`

# Uso de la aplicación

Entrar a la interfaz web en http://localhost:3000

Navegar por los módulos del menú (Navbar):

Géneros
Directores
Productoras
Tipos
Películas

Agregar, editar o eliminar registros (CRUD).

Crear películas asociando los datos requeridos.

# Pruebas

La aplicación fue probada navegando en los diferentes módulos verificando:

Comunicaciones correctas entre frontend y backend
Consultas, creaciones, ediciones y eliminaciones funcionando
Películas reproducibles mediante la url registrada
Integración con Docker sin errores

# Contenerización con Docker – Aplicación de Gestión de Películas

Aplicación desarrollada con Node.js + Express (Backend) y React (Frontend), contenerizada completamente con Docker, utilizando Dockerfiles por servicio, archivos .dockerignore, y un docker-compose.yml para orquestar todo el sistema.

# Estructura basica del repositorio con docker

/backend
   ├── Dockerfile
   ├── .dockerignore
   ├── src/
   ├── package.json

/frontend
   ├── Dockerfile
   ├── .dockerignore
   ├── src/
   ├── package.json

docker-compose.yml
README.md

# Objetivo de la contenerización

La contenerización permite empaquetar el backend y el frontend en contenedores independientes, garantizando que:

La aplicación siempre corra igual, sin importar el sistema operativo.
El entorno de ejecución sea reproducible.
El despliegue sea más rápido y sin conflictos de dependencias.
El proyecto esté listo para usarse en Docker Desktop, servidores, Docker Hub, etc.

# Dockerfiles utilizados

A continuación se resumen los archivos creados para contenerizar cada módulo.

Backend – Dockerfile:

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]

| Instrucción                 | Explicación                                                  |
| --------------------------- | ------------------------------------------------------------ |
| `FROM node:18-alpine`       | Imagen ligera optimizada para producción.                    |
| `WORKDIR /app`              | Carpeta donde se ejecutará el backend dentro del contenedor. |
| `COPY package*.json`        | Permite instalar dependencias sin copiar todo el proyecto.   |
| `RUN npm install`           | Instala las dependencias.                                    |
| `COPY . .`                  | Copia el código fuente.                                      |
| `EXPOSE 4000`               | Indica que el backend escucha en el puerto 4000.             |
| `CMD ["npm", "run", "dev"]` | Arranca el backend.                                          |

Backend – .dockerignore

node_modules
npm-debug.log
.DS_Store
.vscode
coverage
dist

¿Por qué ignoramos estos archivos?

node_modules: se reconstruyen dentro del contenedor → ahorra espacio.
archivos temporales (.log, .DS_Store): no necesarios.
coverage, dist: son generados en desarrollo, no deben subirse a la imagen.
.vscode: configuración local del editor, no pertenece al contenedor.

Frontend – Dockerfile

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

La lógica es igual al backend, pero expone el puerto 3000 y usa "npm start".
