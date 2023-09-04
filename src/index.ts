import "dotenv/config";
import "reflect-metadata";
import { app } from "./app";
import { AppDataSource } from "./db";

const { PORT } = process.env;

const main = async () => {
  try {
    await AppDataSource.initialize();
    console.log("database connected");
    app.listen(PORT, () =>
      console.log(`Server is running! in http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error(error);
  }
};

main();
