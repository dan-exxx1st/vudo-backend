const config = {
  client: "postgres",
  connection: process.env.DATABASE_URL || {
    database: process.env.DB_NAME || "vudo",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "123",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "5432",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

export default config;
