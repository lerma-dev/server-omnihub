import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret_key = process.env.JWT_SECRET || 'clave_temporal_de_emergencia';

export async function Login(req, res){
  const { correo, password } = req.body;
  try {
    const [result] = await db.query('CALL sp_login_user(?)', [correo]);

    const user = result[0][0];

    //validar si el usuario existe
    if(!user){
      return(
        res.status(401).json({
          ok: false,
          message: "Correo o contraseña incorrectos"
        })
      );
    }

    // comparar las contraseñas
    const validPassword = await bcrypt.compare(password, user.contrasena);
    if (!validPassword) {
      return(
        res.status(401).json({ 
          ok: false, 
          message: "Correo o contraseña incorrectos"
        })
      );
    }

    // Generar el Token
    const token = jwt.sign(
      { id: user.id },           
      secret_key, 
      { expiresIn: '24h' }
    );

    // si todo salio bien entro a la pagina principal
    res.status(200).json({
      ok: true,
      message: "Login Exitoso",
      token: token
    });
    
  }catch (error) {
    res.status(500).json({ 
      ok: false, 
      message: "Error al loguearse",
      error: error.message 
    });
  }
}

export async function Register(req, res) {
  const {nombre, apellido, correo, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.query(
      'CALL sp_register_user(?, ?, ?, ?)', [nombre, apellido, correo, hashedPassword]
    );
    res.status(201).json({
      ok: true,
      message: "Usuario registrado con exito"
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al registrar usuario",
      error: error.message
    });
  }
}