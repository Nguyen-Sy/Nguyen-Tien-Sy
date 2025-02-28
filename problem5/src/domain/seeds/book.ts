import { BOOK_GENRES } from "@shared/constant";

import bookModel from "../models/book.model";

import { users } from "./user";

const up = async () => {
    const books = Array.from({ length: 20 }, (_, index) => ({
        author: users[index % users.length]._id,
        title: `Book Title ${index + 1}`,
        genres: [
            BOOK_GENRES[index % BOOK_GENRES.length],
            BOOK_GENRES[Math.floor(Math.random() * BOOK_GENRES.length + 1)],
        ],
    }));

    await bookModel.insertMany(books);
};

const down = async () => {
    await bookModel.deleteMany();
};

const bookMigrate = {
    down,
    up,
};

export default bookMigrate;
