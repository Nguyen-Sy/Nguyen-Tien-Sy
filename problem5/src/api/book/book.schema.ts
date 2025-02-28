import { BOOK_GENRES } from "@shared/constant";
import { limit, objectId, orderBy, page, sort } from "@shared/schema";
import Joi from "joi";

const title = Joi.string();
const genre = Joi.string().valid(...BOOK_GENRES);
const genres = Joi.alternatives().try(
    Joi.array().items(genre),
    genre.custom((value) => [value]),
);

export const createBookSchema = Joi.object().keys({
    title: title.required(),
    genres: genres.required(),
});

export const updateBookBodySchema = Joi.object().keys({
    title,
    genres,
});
export const updateBookParamsSchema = Joi.object().keys({
    bookId: objectId.required(),
});

export const deleteBookSchema = updateBookParamsSchema;
export const getBookSchema = updateBookParamsSchema;

export const getBooksSchema = Joi.object().keys({
    author: objectId,
    title,
    genres,
    page,
    limit,
    sort,
    orderBy: orderBy
        .valid(...["title", "author", "createdAt"])
        .default("createdAt"),
});
