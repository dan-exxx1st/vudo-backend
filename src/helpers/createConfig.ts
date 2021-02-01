export function createConfig() {
  const config = {
    APP_PORT: process.env.PORT || "8080",
    DB_NAME: process.env.DB_NAME || "vudo",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 5432,
    DB_USER: process.env.DB_USER || "postgres",
    DB_PASSWORD: process.env.DB_PASSWORD || "123",
  };

  return config;
}
