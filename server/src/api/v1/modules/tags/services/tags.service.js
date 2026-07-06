import * as repository from "../repositories/tags.repository.js";

export const getAllTags = () => {
    return repository.findAll();
};

export const getTagById = (id) => {
    return repository.findById(id);
};