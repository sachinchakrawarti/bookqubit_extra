import { Router } from "express";

const router = Router();

router.post("/create", (req, res) => {
    res.json({
        success: true,
        message: "Create Tag"
    });
});

router.put("/:id", (req, res) => {
    res.json({
        success: true,
        message: "Update Tag"
    });
});

router.delete("/:id", (req, res) => {
    res.json({
        success: true,
        message: "Delete Tag"
    });
});

export default router;