import db from "../../../../../database/connection.js";

export const findAll = async () => {
    return await db("book_tags")
        .select("*")
        .orderBy("sort_order");
};

export const findById = async (id) => {
    return await db("book_tags")
        .where({ tag_id: id })
        .first();
};