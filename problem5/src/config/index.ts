import { NodeEnv } from "@shared/constant";
import * as dotenv from "dotenv";

dotenv.config();

interface Config {
    port: number;
    nodeEnv: NodeEnv;
    writeLogFile: boolean;

    mongoUrl: string;
    redis: {
        host: string;
        port: number;
        db: number;
    };

    jwtAccessSecret: string;
    jwtRefreshSecret: string;
}

const config: Config = {
    port: Number(process.env.PORT ?? "3000"),
    nodeEnv: (process.env.NODE_ENV as NodeEnv) ?? NodeEnv.DEV,
    writeLogFile: process.env.NODE_ENV === NodeEnv.PROD,

    mongoUrl: process.env.MONGO_URL!,
    redis: {
        host: process.env.REDIS_HOST!,
        port: Number(process.env.REDIS_PORT!),
        db: Number(process.env.REDIS_DB!),
    },

    jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
};

export default config;
