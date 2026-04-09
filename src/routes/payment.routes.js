// src/payment.routes.js
import { Router } from 'express';
import { createOrder, captureOrder } from '../controllers/payment.controller.js';

const router = Router();

// Ruta para generar el pago al dar clic en "COMPRAR"
router.post('/create-order', createOrder);

// Ruta para confirmar que el pago se realizó
router.get('/capture-order/:orderID', captureOrder);

export default router;