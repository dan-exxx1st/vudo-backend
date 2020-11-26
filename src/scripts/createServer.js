import fastify from "fastify";
import { Routes } from "routes";

export function createServer() {
  const app = fastify({ logger: true });

  app.register(Routes);

  return app;
}
