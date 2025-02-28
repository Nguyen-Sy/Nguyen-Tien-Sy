import { Request } from "express";

export const extractRequest = <T>(
    req: Request,
    field: "body" | "params" | "query" | "user",
) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (req as any)[field] as unknown as T;
};
