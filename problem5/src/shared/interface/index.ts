export interface Pagination<T> {
    totalPage: number;
    currentPage: number;
    limit: number;
    items: T[];
}

export interface PaginationDto {
    page: number;
    limit: number;
    orderBy?: string;
    sort?: "ASC" | "DESC";
}

export type JwtPayload = {
    userEmail: string,
    id: string
}