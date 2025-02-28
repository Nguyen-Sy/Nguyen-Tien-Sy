import { CreatedResponse, OkResponse } from "@shared/decorators/response";
import { extractRequest } from "@shared/helper/request";
import { JwtPayload } from "@shared/interface";
import { NextFunction, Request, Response } from "express";

import { CreateBookDto, GetBooksDto, UpdateBookDto } from "./book.dto";
import bookService from "./book.service";

class BookController {
    @CreatedResponse("Create book successfully")
    async createBook(req: Request, _res: Response, _next: NextFunction) {
        const jwtPayload = extractRequest<JwtPayload>(req, "user");
        const dto = extractRequest<CreateBookDto>(req, "body");

        return await bookService.createBook({ ...dto, author: jwtPayload.id });
    }

    @OkResponse("Get list books successfully")
    async getBooks(req: Request, _res: Response, _next: NextFunction) {
        const queries = extractRequest<GetBooksDto>(req, "query");
        return await bookService.getBooks(queries);
    }

    @OkResponse("Update book successfully")
    async updateBook(req: Request, _res: Response, _next: NextFunction) {
        const jwtPayload = extractRequest<JwtPayload>(req, "user");
        const { bookId } = extractRequest<{ bookId: string }>(req, "params");
        const dto = extractRequest<UpdateBookDto>(req, "body");

        return await bookService.updateBook(jwtPayload.id, bookId, dto);
    }

    @OkResponse("Delete book successfully")
    async deleteBook(req: Request, _res: Response, _next: NextFunction) {
        const jwtPayload = extractRequest<JwtPayload>(req, "user");
        const { bookId } = extractRequest<{ bookId: string }>(req, "params");

        return await bookService.deleteBook(jwtPayload.id, bookId);
    }

    @OkResponse("Get detailed book successfully")
    async getBook(req: Request, _res: Response, _next: NextFunction) {
        const { bookId } = extractRequest<{ bookId: string }>(req, "params");

        return await bookService.getBook(bookId);
    }
}

const bookController = new BookController();
export default bookController;
