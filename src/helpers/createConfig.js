export function createConfig() {
  const config = {
    APP_PORT: process.env.APP_PORT || "8080",
  };

  return config;
}
