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

