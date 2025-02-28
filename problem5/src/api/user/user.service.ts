import redisInstance from "@domain/db/redis";
import userModel, { UserModel } from "@domain/models/user.model";
import { Cache } from "@shared/decorators/cache";
import { comparePassword, hashPassword } from "@shared/helper/bcrypt";
import { createJwtTokens } from "@shared/helper/jwt";
import { JwtPayload } from "@shared/interface";
import { BadRequestError } from "@shared/lib/http/httpError";
import { Types } from "mongoose";

import { SignInDto, SignUpDto, UpdateUserDto } from "./user.dto";

class UserService {
    constructor(private readonly model = userModel) {}

    async signUp(dto: SignUpDto) {
        const existedUser = await this.model.findOne({
            userEmail: dto.userEmail,
        });
        if (existedUser) throw new BadRequestError("User already created");

        dto.password = hashPassword(dto.password);

        const _id = new Types.ObjectId();
        const tokens = createJwtTokens({
            id: _id.toString(),
            userEmail: dto.userEmail,
        });

        await this.model.create({
            _id,
            ...dto,
            refreshToken: tokens.refreshToken,
        });

        return tokens;
    }

    async signIn(dto: SignInDto) {
        const existedUser = await this.model.findOne({
            userEmail: dto.userEmail,
        });

        if (
            !existedUser ||
            !comparePassword(existedUser.password, dto.password)
        )
            throw new BadRequestError("User email/ Password not correct");

        const tokens = createJwtTokens({
            id: existedUser._id.toString(),
            userEmail: existedUser.userEmail,
        });

        this.model.findOneAndUpdate(
            { userEmail: dto.userEmail },
            { refreshToken: tokens.refreshToken },
        );

        return tokens;
    }

    @Cache("user", 300)
    async getUser(userId: string) {
        const existedUser = await this.model.findOne({
            _id: userId,
        });

        if (!existedUser) throw new BadRequestError("User not found");
        const { name, userEmail, _id } = existedUser;
        return { name, userEmail, _id };
    }

    async updateUser(userId: string, dto: UpdateUserDto) {
        const existedUser = await this.model.findOne({
            _id: userId,
        });
        if (!existedUser) throw new BadRequestError("User not found");

        const { name, userEmail, _id } = (await this.model.findOneAndUpdate(
            { _id: userId },
            dto,
            {
                new: true,
            },
        )) as UserModel;
        
        redisInstance.client?.set(
            `user:${userId}`,
            JSON.stringify({ name, userEmail, _id }),
        );

        return { name, userEmail, _id };
    }

    async handleRefreshToken(
        refreshToken: string,
        { id, userEmail }: JwtPayload,
    ) {
        const existedUser = (await this.model.findOne({
            _id: id,
        })) as UserModel;

        if (
            existedUser.refreshTokensUsed.includes(refreshToken) ||
            existedUser.refreshToken !== refreshToken
        )
            throw new BadRequestError("Invalid refresh token");

        const tokens = createJwtTokens({ id, userEmail });
        await this.model.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $push: {
                    refreshTokensUsed: {
                        $each: [refreshToken],
                        $slice: -20,
                    },
                },
                refreshToken: tokens.refreshToken,
            },
        );
        return tokens;
    }
}

const userService = new UserService();
export default userService;
