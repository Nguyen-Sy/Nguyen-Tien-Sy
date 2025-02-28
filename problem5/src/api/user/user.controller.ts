import { OkResponse } from "@shared/decorators/response";
import { extractRequest } from "@shared/helper/request";
import { JwtPayload } from "@shared/interface";
import { NextFunction, Request, Response } from "express";

import { SignInDto, SignUpDto, UpdateUserDto } from "./user.dto";
import userService from "./user.service";

class UserController {
    @OkResponse("Sign up successfully")
    async signUp(req: Request, _res: Response, _next: NextFunction) {
        const dto = extractRequest<SignUpDto>(req, "body");
        return await userService.signUp(dto);
    }

    @OkResponse("Sign in successfully")
    async signIn(req: Request, _res: Response, _next: NextFunction) {
        const dto = extractRequest<SignInDto>(req, "body");
        return await userService.signIn(dto);
    }

    @OkResponse("Get user successfully")
    async getUser(req: Request, _res: Response, _next: NextFunction) {
        const jwtPayload = extractRequest<JwtPayload>(req, "user");
        return await userService.getUser(jwtPayload.id);
    }

    @OkResponse("Update user successfully")
    async updateUser(req: Request, _res: Response, _next: NextFunction) {
        const jwtPayload = extractRequest<JwtPayload>(req, "user");
        const dto = extractRequest<UpdateUserDto>(req, "body");
        return await userService.updateUser(jwtPayload.id, dto);
    }

    @OkResponse("Handle refresh token successfully")
    async handleRefreshToken(
        req: Request,
        _res: Response,
        _next: NextFunction,
    ) {
        const jwtPayload = extractRequest<JwtPayload>(req, "user");
        const refreshToken = req.headers.authorization?.split(" ")[1] as string;
        return await userService.handleRefreshToken(refreshToken, jwtPayload);
    }
}

const userController = new UserController();
export default userController;
