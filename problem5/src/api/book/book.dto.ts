import { PaginationDto } from "@shared/interface";

export type CreateBookDto = UpdateBookDto & {
    author: string;
};

export type UpdateBookDto = {
    title: string;
    genres: string[];
};

export type GetBooksDto = {
    genres?: string[],
    author?: string,
    title?: string,
} & PaginationDto
