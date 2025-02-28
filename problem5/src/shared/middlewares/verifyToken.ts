import { verifyToken } from "@shared/helper/jwt";
import { JwtPayload } from "@shared/interface";
import { UnauthorizedError } from "@shared/lib/http/httpError";
import lodash from "lodash";
import { NextFunction, Request, Response } from "express";

export const authorizeToken = (tokenType: "access" | "refresh") => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return next(new UnauthorizedError());

        const jwtPayload: JwtPayload | null = verifyToken(token, tokenType);
        if (!jwtPayload) return next(new UnauthorizedError());

        lodash.set(req, "user", jwtPayload);
        next();
    };
};
