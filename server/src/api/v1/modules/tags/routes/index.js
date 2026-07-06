import { Router } from "express";

import tagsRoutes from "./tags.routes.js";
import adminRoutes from "./admin.routes.js";

const router = Router();

router.use("/", tagsRoutes);

router.use("/admin", adminRoutes);

export default router;