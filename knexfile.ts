import { createConfig } from "./src/helpers/createConfig";

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = createConfig();

const config = {
  client: "postgres",
  connection: {
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./src/db/migrations",
  },
  seeds: {
    directory: "./src/db/seeds",
  },
};

export default config;
