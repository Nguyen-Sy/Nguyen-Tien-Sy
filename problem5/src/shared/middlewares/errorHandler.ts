import config from "@config/index";
import logger from "@shared/lib/logger";
import { NextFunction, Request, Response } from "express";

import { NodeEnv } from "../constant";
import { HttpError, NotFoundError } from "../lib/http/httpError";

export const handleNotFound = (
    _req: Request,
    _res: Response,
    next: NextFunction,
) => {
    next(new NotFoundError());
};

export const handleError = (
    error: HttpError,
    req: Request,
    res: Response,
    _next: NextFunction,
) => {
    const errorCode = error.statusCode ?? 500;

    const errorResponse: {
        message: string;
        statusCode: number;
        data: null;
        stack?: string;
    } = {
        message: error.message,
        statusCode: error.statusCode,
        data: null,
    };

    if (config.nodeEnv === NodeEnv.DEV) {
        errorResponse.stack = error.stack;
        
        logger.error(errorResponse, {
            requestId: req.headers["x-request-id"] as string,
        });
    }
    return res.status(errorCode).json({
        message: error.message,
        statusCode: error.statusCode,
        data: null,
    });
};
