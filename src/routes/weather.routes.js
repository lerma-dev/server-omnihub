import { Router } from 'express';
import { GetClima } from '../controllers/weather.controller.js';

const router = Router();

router.get('/current', GetClima);

export default router;