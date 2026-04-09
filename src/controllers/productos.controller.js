// server/src/controllers/products.controller.js
import db from '../config/db.js';

export async function getProductos(_req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM productos');
    res.json({
      ok: true,
      data: rows
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error al obtener productos',
      error: error.message
    });
  }
}

export async function getProductoById(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM productos WHERE id_producto = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      ok: true,
      data: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error al obtener productos',
      error: error.message
    });
  }
}