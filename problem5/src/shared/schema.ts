import Joi from "joi";
import { isValidObjectId, Types } from "mongoose";

export const page = Joi.number().min(1).default(1);
export const limit = Joi.number().min(5).max(30).default(30);
export const sort = Joi.string().valid("DESC", "ASC").default("ASC");
export const orderBy = Joi.string();

export const positiveNumber = Joi.number().greater(0).default(1);
export const negativeNumber = Joi.number().less(0).default(-1);
export const objectId = Joi.string().custom((value, helper) => {
    if (!isValidObjectId(value))
        return helper.message({ custom: "Invalid objectId" });
    return Types.ObjectId.createFromHexString(value)
});
