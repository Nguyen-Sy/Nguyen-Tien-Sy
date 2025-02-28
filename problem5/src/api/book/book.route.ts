import { validator } from "@shared/middlewares/validator";
import { authorizeToken } from "@shared/middlewares/verifyToken";
import { asyncWrapper } from "@shared/utils/asyncWrapper";
import { Router } from "express";

import bookController from "./book.controller";
import {
    createBookSchema,
    deleteBookSchema,
    getBookSchema,
    getBooksSchema,
    updateBookBodySchema,
    updateBookParamsSchema,
} from "./book.schema";

const bookRouter = Router();

bookRouter.post(
    "/:bookId",
    validator({
        body: updateBookBodySchema,
        params: updateBookParamsSchema,
    }),
    authorizeToken("access"),
    asyncWrapper(bookController.updateBook),
);

bookRouter.post(
    "/",
    validator({
        body: createBookSchema,
    }),
    authorizeToken("access"),
    asyncWrapper(bookController.createBook),
);

bookRouter.delete(
    "/:bookId",
    validator({
        params: deleteBookSchema,
    }),
    authorizeToken("access"),
    asyncWrapper(bookController.deleteBook),
);

bookRouter.get(
    "/:bookId",
    validator({
        params: getBookSchema,
    }),
    asyncWrapper(bookController.getBook),
);

bookRouter.get(
    "/",
    validator({
        query: getBooksSchema,
    }),
    asyncWrapper(bookController.getBooks),
);

export default bookRouter