import express from "express";

import bookRouter from "./book/book.route";
import healthCheckRouter from "./healthCheck/healthCheck.route";
import userRouter from "./user/user.route";

const router = express.Router();

router.use("/health_check", healthCheckRouter);
router.use("/user", userRouter);
router.use("/book", bookRouter);

export default router;
