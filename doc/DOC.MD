# 📑 Guía de Instalación y Estructura del backend - Proyecto OmniHub

#### Estructura Raíz del Proyecto
Creamos o nos cambiamos a la carpeta principal que contendrá tanto el Frontend como el Backend:

**Esta carpeta es la que va contener la carpeta  `server` y `client`**
```bash
mkdir omniHub
cd omniHub
```

### 1. Creación del Servidor Node.js & Express:
Regresamos a la carpeta raíz omniHub y configuramos el backend:
`1. Inicialización:`

```bash
mkdir server
cd server
npm init -y
```

`2. Instalación de Dependencias del Servidor:`
Para que el servidor funcione, necesitamos instalar los siguientes paquetes dentro de la carpeta server:`

```bash
# Dependencias de producción
npm install express cors dotenv mysql2 
npm install bcrypt jsonwebtoken
npm install @paypal/checkout-server-sdk

# Dependencias de desarrollo
npm install --save-dev nodemon
``` 
- express: Framework para el servidor web.

- mysql2: Driver para conectar con la base de datos omnihub_db.

- bcrypt: Es para encriptar las contraseñas y NO esten en texto plano.

- dotenv: Para manejar variables de entorno seguras (.env).

- cors: Permite que el frontend (client) se comunique con el backend (server).

- @paypal/checkout-server-sdk: Es para conectarnos  a la api de Paypal y dejarla lista en el backend para que el `client` 
pueda usar el endpoint que se conecta con la api de Paypal.

- nodemon: Reinicia el servidor automáticamente al detectar cambios solo haces `ctrl + s`.

`3. Configuración de ES Modules y Scripts de arranque:`

**IMPORTANTE**: Abrir el archivo package.json y editarlo para que coincida con este formato:

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "backend del frontend del Ionic",
  "main": "index.js",
  "type": "module", // Se agrego esta linea poder usar "import" en lugar de "require"
  "scripts": {
    "start": "node index.js", // Se agrego esta linea para arranque
    "dev": "nodemon index.js" // Se agrego esta linea para desarrollo
  },
  "author": "Hector Lerma",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^6.0.0",
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "mysql2": "^3.20.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

`3. Creación de archivos base:`

```bash
touch index.js .env .gitignore database.sql
mkdir src
``` 

`4. Organización por capas (Carpeta src):`

Dentro de src separamos la lógica para evitar el "código espagueti":

- config/: Conexión a la base de datos (MySQL).

- controllers/: Lógica de las funciones (Login, registro, etc.).

- routes/: Definición de los endpoints de la API.

- api/: Consumo de servicios externos (OpenWeather).

### 2. Árbol de Directorios Final
Así es como debe verse tu carpeta de servidor para mantener el orden:

```
/server
├── node_modules/       <-- Librerías instaladas
├── src/
│   ├── api/            <-- Integraciones externas
│   ├── config/         <-- Conexión DB
│   ├── controllers/    <-- Lógica de negocio
│   ├── routes/         <-- Rutas del servidor
│   └── server.js       <-- Configuración de Express
├── .env                <-- Variables sensibles (Contraseñas)
├── .gitignore          <-- Archivos que no se suben a Git
├── database.sql        <-- Script de creación de tablas
├── index.js            <-- Punto de arranque del servidor
│── package.json        <-- Configuración del proyecto se crea al hacer `npm init -y`
└── package-lock.json   <-- Dependencias del proyecto se crea al hacer `npm intall <dependencia>`
```

#### 3. Variables de Entorno (.env)
- Crea un archivo .env en la raíz con lo siguiente:
  - La estructura es la que deje de ejemplo de `.env.ejemplo`


### 4. Ejecutar

```bash
# Modo desarrollo (se reinicia al guardar)
npm run dev

# Modo producción
npm start
``` 

### 5. Seccion de pruebas rapidas:
Una vez que el servidor esté corriendo (`npm run dev`) o (`npm start`), puedes probar el endpoint del clima o lugares usando CURL o Postman:

```bash 
# para el clima
curl "http://localhost:3000/api/v1/weather/current?lat=31.69&lon=-106.42"
# para los lugares
curl "http://localhost:3000/api/v1/places/nearby?lat=31.69&lng=-106.42"
```

**¿Cómo se ve el flujo completo?**
```
[ Cliente (Ionic/React) ] <--- CORS ---> [ Servidor (Node/Express) ] <--- Driver ---> [ DB (MySQL) ]
    (Puerto 8100)                              (Puerto 3000)                           (omnihub_db)
```