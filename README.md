# Instalación local

### **💡Nota:**
He incluido un archivo `.env.example`. Por favor, **`cópienlo`** y renómbrelo a `.env` para configurar su conexión local a la base de datos sin subir sus claves al repo.

#### Clona repoositorio:
```bash
git clone https://github.com/lerma-dev/server-omnihub.git
```  

#### Iniciar Backend de omniHub:
- Y en otra terminal
```bash
cd server
npm install
npm run dev
``` 

**💡 Tips:**
Archivo `.env`: Recuerden que aquí va la contraseña de la base de datos `(DB_PWD)`. Jamás debe subirse a GitHub por seguridad.

Archivo `database.sql`: Es vital que todos usen el mismo nombre de base de datos `(omnihub_db)` para que la conexión funcione en todas las máquinas.

**Check de Seguridad para OmniHub:**
1. En el Código: Recuerda usar process.env.DB_PWD para llamar a la contraseña.

2. En Git: Verifica una última vez que tu archivo .gitignore contenga la línea /.env (sin el `.example`) para que tus llaves de PayPal, OpenWeatherMap y el JWT no terminen en internet.

2. En la DB: DB_NAME= esta vacío, deben crearla con el nombre que elijan o el que defini en el `database.sql`.