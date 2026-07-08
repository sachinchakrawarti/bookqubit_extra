// src/api/v1/centralv1api/centralv1api.js

import { Router } from 'express';

import languagesRoutes from '../modules/languages/index.js';

const router = Router();

router.use('/languages', languagesRoutes);

export default router;