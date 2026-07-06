import * as tagsService from "../services/tags.service.js";

export const getAllTags = async (req, res, next) => {
    try {
        const data = await tagsService.getAllTags();

        res.status(200).json({
            success: true,
            data
        });
    } catch (err) {
        next(err);
    }
};

export const getTagById = async (req, res, next) => {
    try {
        const data = await tagsService.getTagById(req.params.id);

        res.status(200).json({
            success: true,
            data
        });
    } catch (err) {
        next(err);
    }
};