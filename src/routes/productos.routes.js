// server/src/routes/productos.routes.js
import { Router } from 'express';
import { getProductos, getProductoById } from '../controllers/productos.controller.js';

const router = Router();

router.get('/all', getProductos);
router.get('/:id', getProductoById)

export default router;