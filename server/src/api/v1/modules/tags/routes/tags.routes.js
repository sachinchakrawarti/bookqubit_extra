import { Router } from "express";
import * as controller from "../controllers/tags.controller.js";

const router = Router();

router.get("/", controller.getAllTags);

router.get("/:id", controller.getTagById);

export default router;