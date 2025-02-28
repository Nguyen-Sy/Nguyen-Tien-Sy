import config from "@config/index";
import { NodeEnv } from "@shared/constant";
import logger from "@shared/lib/logger";
import mongoose from "mongoose";

class Mongodb {
    private static instance: Mongodb;
    connection: typeof mongoose | null = null;

    connect() {
        if (this.connection) {
            logger.info("Already connected to MongoDB");
            return;
        }

        if (config.nodeEnv === NodeEnv.DEV) {
            mongoose.set("debug", true);
            mongoose.set("debug", {
                color: true,
            });
        }

        mongoose
            .connect(config.mongoUrl)
            .then((connection) => {
                this.connection = connection;
                logger.info("Mongo connection created");
            })
            .catch((error) => {
                logger.error(`Mongo connection refuse: ${error.message}`);
            });
    }

    public static getInstance(): Mongodb {
        if (!Mongodb.instance) {
            Mongodb.instance = new Mongodb();
        }
        return Mongodb.instance;
    }
}

const instance = Mongodb.getInstance();
instance.connect();

export default instance;
