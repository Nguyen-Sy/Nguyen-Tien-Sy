import { model, ObjectId, Schema } from "mongoose";

import { BaseModel } from "./index.model";

export type BookModel = {
    author: ObjectId;
    title: string;
    genres: string[];
} & BaseModel;

const bookSchema = new Schema<BookModel>(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        genres: {
            type: [String],
            default: [],
        },
    },
    {
        collection: "Books",
        timestamps: true,
    },
);

bookSchema.index({ title: "text" })
const bookModel = model("Book", bookSchema);
export default bookModel;
