// server.js
import express from 'express';
import cors from 'cors';
import db from './config/db.js';
// rutas
import productsRoutes from './routes/productos.routes.js';
import usersRoutes from './routes/users.routes.js';
import climaRoutes from './routes/weather.routes.js';
import placesRoutes from './routes/places.routes.js';
import paymentRoutes from './routes/payment.routes.js';
//colores
const white = "\x1b[0m";
const yellow = "\x1b[33m";
const blue = "\x1b[34m";

class Server {
  constructor(){
    this.app = express();
    this.host = process.env.HOST;
    this.port = process.env.PORT;
    this.middleware();
    this.ConnectDB();
    this.routes();
  }

  middleware(){
    this.app.use(express.json());
    this.app.use(cors());
  } 

  async ConnectDB(){
    try {
      await db.query('SELECT 1');
      console.log('🟢 Base de datos conectada correctamente');
    } catch (error) {
      console.error('🔴 Error de conexión a la base de datos:', error.message);
    }
  }

  routes(){
    //Endpoints
    this.app.use('/api/v1/productos', productsRoutes);
    this.app.use('/api/v1/users', usersRoutes);    
    this.app.use('/api/v1/weather', climaRoutes); 
    this.app.use('/api/v1/places', placesRoutes); 
    this.app.use('/api/v1/payment', paymentRoutes) 

    this.app.get('/', (_req, res) => {
      res.json({
        status: "success", 
        message: "Servidor de OmniHub listo",
      });
    });
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log('Local:', blue, `http://${this.host}:${this.port}`, white);
      console.log(yellow + "Use Ctrl+C to quit this process" + white);
    });
  }
}
export default Server;