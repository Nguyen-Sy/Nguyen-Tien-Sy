import config from "@config/index";
import { JwtPayload } from "@shared/interface";
import jwt from "jsonwebtoken";

export const createJwtTokens = (payload: JwtPayload) => {
    const accessToken = jwt.sign(payload, config.jwtAccessSecret, {
        expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, {
        expiresIn: "30d",
    });

    return { accessToken, refreshToken };
};

export const verifyToken = (token: string, type: "access" | "refresh") => {
    try {
        const payload = jwt.verify(
            token,
            type === "access"
                ? config.jwtAccessSecret
                : config.jwtRefreshSecret,
        );
        return payload as JwtPayload;
    } catch {
        return null;
    }
};
