import config from "@config/index";
import logger from "@shared/lib/logger";
import Redis from "ioredis";

class RedisClient {
    private static instance: RedisClient;
    client: Redis | null = null;

    connect() {
        if (this.client) {
            logger.info("Already connected to Redis");
            return;
        }

        this.client = new Redis(config.redis);
        this.client.on("connect", () => {
            logger.info("Redis connection created");
        });

        this.client.on("error", (err) => {
            logger.error(`Redis connection refused: ${err.message}`);
        });
    }

    public static getInstance(): RedisClient {
        if (!RedisClient.instance) {
            RedisClient.instance = new RedisClient();
        }
        return RedisClient.instance;
    }
}

const redisInstance = RedisClient.getInstance()
redisInstance.connect()

export default redisInstance
