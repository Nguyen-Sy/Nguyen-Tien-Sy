import { Types } from "mongoose";

import userModel from "../models/user.model";

// str0ngP@ssword
export const users = [
    {
        _id: new Types.ObjectId("65a0f0a4c123456789abcde0"),
        userEmail: "user1@example.com",
        password:
            "$2b$10$bCNzcQ6dWfp86N4aKOHdNu9ZNM0cfAQQK.6nKLzIP6Zju9rNjo2OC",
        name: "John Doe",
    },
    {
        _id: new Types.ObjectId("65a0f0a4c123456789abcde1"),
        userEmail: "user2@example.com",
        password:
            "$2b$10$bCNzcQ6dWfp86N4aKOHdNu9ZNM0cfAQQK.6nKLzIP6Zju9rNjo2OC",
        name: "Jane Smith",
    },
    {
        _id: new Types.ObjectId("65a0f0a4c123456789abcde2"),
        userEmail: "user3@example.com",
        password:
            "$2b$10$bCNzcQ6dWfp86N4aKOHdNu9ZNM0cfAQQK.6nKLzIP6Zju9rNjo2OC",
        name: "Alice Johnson",
    },
    {
        _id: new Types.ObjectId("65a0f0a4c123456789abcde3"),
        userEmail: "user4@example.com",
        password:
            "$2b$10$bCNzcQ6dWfp86N4aKOHdNu9ZNM0cfAQQK.6nKLzIP6Zju9rNjo2OC",
        name: "Bob Brown",
    },
    {
        _id: new Types.ObjectId("65a0f0a4c123456789abcde4"),
        userEmail: "user5@example.com",
        password:
            "$2b$10$bCNzcQ6dWfp86N4aKOHdNu9ZNM0cfAQQK.6nKLzIP6Zju9rNjo2OC",
        name: "Charlie Davis",
    },
    {
        _id: new Types.ObjectId("65a0f0a4c123456789abcde5"),
        userEmail: "user6@example.com",
        password:
            "$2b$10$bCNzcQ6dWfp86N4aKOHdNu9ZNM0cfAQQK.6nKLzIP6Zju9rNjo2OC",
        name: "Diana Evans",
    },
    {
        _id: new Types.ObjectId("65a0f0a4c123456789abcde6"),
        userEmail: "user7@example.com",
        password:
            "$2b$10$bCNzcQ6dWfp86N4aKOHdNu9ZNM0cfAQQK.6nKLzIP6Zju9rNjo2OC",
        name: "Ethan Green",
    },
    {
        _id: new Types.ObjectId("65a0f0a4c123456789abcde7"),
        userEmail: "user8@example.com",
        password:
            "$2b$10$bCNzcQ6dWfp86N4aKOHdNu9ZNM0cfAQQK.6nKLzIP6Zju9rNjo2OC",
        name: "Fiona Harris",
    },
    {
        _id: new Types.ObjectId("65a0f0a4c123456789abcde8"),
        userEmail: "user9@example.com",
        password:
            "$2b$10$bCNzcQ6dWfp86N4aKOHdNu9ZNM0cfAQQK.6nKLzIP6Zju9rNjo2OC",
        name: "George Iverson",
    },
    {
        _id: new Types.ObjectId("65a0f0a4c123456789abcde9"),
        userEmail: "user10@example.com",
        password:
            "$2b$10$bCNzcQ6dWfp86N4aKOHdNu9ZNM0cfAQQK.6nKLzIP6Zju9rNjo2OC",
        name: "Hannah Jackson",
    },
];

export const up = async () => {
    await userModel.insertMany(users)
};

export const down = async () => {
    await userModel.deleteMany();
};

const userMigrate = {
    up,
    down,
};

export default userMigrate;
