import { Router } from 'express';
import { getNearby } from '../controllers/places.controller.js';

const router = Router();

router.get('/nearby', getNearby);

export default router;