import "../db/index";

import bookMigrate from "./book";
import userMigrate from "./user";

const main = async () => {
    const validArgs = ["up", "down"];
    const [migrate] = process.argv.slice(2); // Remove the first two elements (node and script path)

    if (!validArgs.includes(migrate)) {
        console.error("Invalid args");
        return;
    }

    const modelsMigrate = [bookMigrate, userMigrate];
    await Promise.all(
        modelsMigrate.map((migration) => migration[migrate as "up" | "down"]()),
    )
        .then(() => {
            console.log(`Migrate ${migrate} complete`);
        })
        .catch((error) => {
            console.error(error.message);
        });
        
    process.exit()
};

main();
