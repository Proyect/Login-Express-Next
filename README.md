# Sistema de Registro y Login

## Requerimientos previos 
## 
- Node.js
- Docker

## Instalación y Ejecución en Local

### Frontend
#1. Ir a la carpeta del frontend: e instalar las dependencias con los siguientes codigos

cd .\frontend\
npm install
npm run dev
cd ..

# Instalar los modulos del backend 
#install backend modules
cd .\backend\
npm install express bcryptjs jsonwebtoken cors dotenv 
npm install sqlite3 better-sqlite3 #if you want to job with sqlite
npm install pg #if you want to job with postgresql  
cd ..

## up docker
docker-compose up --build

# Login-Express-Next
#up the server front end
cd .\frontend\
npm run dev

#up the server backend
cd .\backend\
node server.js  # postgresql serverPG.js
Login and seccion user
