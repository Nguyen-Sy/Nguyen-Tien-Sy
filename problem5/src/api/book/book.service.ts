import redisInstance from "@domain/db/redis";
import bookModel from "@domain/models/book.model";
import { Cache } from "@shared/decorators/cache";
import { paginate } from "@shared/helper/paginate";
import { BadRequestError } from "@shared/lib/http/httpError";

import { CreateBookDto, GetBooksDto, UpdateBookDto } from "./book.dto";

class BookService {
    constructor(private readonly model = bookModel) {}

    async createBook(dto: CreateBookDto) {
        return await this.model.create(dto);
    }

    async updateBook(authorId: string, bookId: string, dto: UpdateBookDto) {
        const existedBook = await this.model.findOne({
            author: authorId,
            _id: bookId,
        });
        if (!existedBook) throw new BadRequestError("Invalid book");

        const book = await this.model.findOneAndUpdate({ _id: bookId }, dto, {
            new: true,
        });

        redisInstance.client?.set(
            `book:${bookId}`,
            JSON.stringify(book),
            "EX",
            300,
        );
    }

    async deleteBook(authorId: string, bookId: string) {
        const existedBook = await this.model.findOne({
            author: authorId,
            _id: bookId,
        });

        if (!existedBook) throw new BadRequestError("Invalid book");
        return await this.model.findOneAndDelete({ _id: bookId });
    }

    @Cache("book", 300)
    async getBook(bookId: string) {
        return await this.model
            .findOne({
                _id: bookId,
            })
            .select("title author genres")
            .populate({
                path: "author",
                select: "name",
            })
            .lean();
    }

    async getBooks(dto: GetBooksDto) {
        const filter: Record<string, unknown> = {};
        const queryOptions: Record<string, unknown> = {};

        if (dto.author) filter.author = dto.author;
        if (dto.title) {
            filter["$text"] = { $search: dto.title };
            queryOptions.score = { $meta: "textScore" };
        }
        if (dto.genres)
            filter.genres = {
                $all: dto.genres,
            };

        const books = await this.model
            .find(filter, queryOptions)
            .select("title author genres")
            .populate({
                path: "author",
                select: "name",
            })
            .lean();
        return paginate(books, dto);
    }
}

const bookService = new BookService();
export default bookService;
