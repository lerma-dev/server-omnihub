// server/src/config/db.js
import mysql from 'mysql2';

const connect = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME
});
export default connect.promise();