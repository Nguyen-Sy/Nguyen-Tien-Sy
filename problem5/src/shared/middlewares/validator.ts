import { Schema } from "joi";
import { NextFunction, Request, Response } from "express";

import { BadRequestError } from "../lib/http/httpError";

interface IValidateSchema {
    body?: Schema;
    query?: Schema;
    params?: Schema;
}

export const validator = (params?: IValidateSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const errors: string[] = []
        if (params?.body) {
            const { error, value } = validate(req.body, params.body);
            if (error) { errors.push(error.message) } else req.body = value
        }
        if (params?.query) {
            const { error, value } = validate(req.query, params.query);
            if (error) { errors.push(error.message) } else req.query = value
        }
        if (params?.params) {
            const { error, value } = validate(req.params, params.params);
            if (error) { errors.push(error.message) } else req.params = value
        }

        if(errors.length !== 0) next(new BadRequestError(errors.join("\n")))
        next();
    };
};

const validate = (req: unknown, schema: Schema) => {
    const { error, value } = schema.validate(req, {
        abortEarly: false,
        convert: true,
    });
    return { error, value }
};
