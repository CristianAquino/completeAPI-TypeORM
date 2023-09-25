import { DataSource } from "typeorm";
import { Product, User } from "./entities";

const { HOST_DB, USERNAME_DB, PASSWORD_DB, DATABASE_DB, PORT_DB } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: HOST_DB as string,
  port: Number(PORT_DB),
  username: USERNAME_DB as string,
  password: PASSWORD_DB as string,
  database: DATABASE_DB as string,
  entities: [User, Product],
  synchronize: true,
});
