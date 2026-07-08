// src/api/v1/modules/languages/routes/languages.routes.js

import { Router } from 'express';
import LanguagesController from '../controllers/languages.controller.js';

const router = Router();

router.get('/', LanguagesController.list);
router.get('/search', LanguagesController.search);
router.get('/code/:code', LanguagesController.getByCode);
router.get('/:id', LanguagesController.getById);

export default router;