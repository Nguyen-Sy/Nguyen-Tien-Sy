import { validator } from "@shared/middlewares/validator";
import { authorizeToken } from "@shared/middlewares/verifyToken";
import { asyncWrapper } from "@shared/utils/asyncWrapper";
import { Router } from "express";

import userController from "./user.controller";
import { signInSchema, signUpSchema, updateUserSchema } from "./user.schema";

const userRouter = Router();

userRouter.post(
    "/sign_up",
    validator({
        body: signUpSchema,
    }),
    asyncWrapper(userController.signUp),
);

userRouter.post(
    "/sign_in",
    validator({
        body: signInSchema,
    }),
    asyncWrapper(userController.signIn),
);

userRouter.get(
    "/",
    authorizeToken("access"),
    asyncWrapper(userController.getUser),
);

userRouter.post(
    "/",
    validator({
        body: updateUserSchema,
    }),
    authorizeToken("access"),
    asyncWrapper(userController.updateUser),
);

userRouter.post(
    "/refresh",
    authorizeToken("refresh"),
    asyncWrapper(userController.handleRefreshToken),
);

export default userRouter;
