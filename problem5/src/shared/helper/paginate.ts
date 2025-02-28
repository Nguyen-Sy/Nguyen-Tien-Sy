import { PaginationDto } from "@shared/interface";

export const paginate = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: Record<string, any>[],
    paginateOption: PaginationDto,
) => {
    const totalPage = Math.ceil(items.length / paginateOption.limit);
    if (paginateOption.orderBy !== undefined) {
        items = items.sort((a, b) => {
            const key = paginateOption.orderBy as string;
            if (paginateOption.sort === "ASC") return a[key] > b[key] ? 1 : -1;
            return a[key] < b[key] ? 1 : -1;
        });
    }

    items = items.slice(
        (paginateOption.page - 1) * paginateOption.limit,
        paginateOption.page * paginateOption.limit,
    );

    return {
        totalPage,
        limit: paginateOption.limit,
        currentPage: paginateOption.page,
        items,
    };
};
