import fastify from "fastify";
import Knex from "knex";
import { Model } from "objection";

import knexSettings from "../../knexfile";
import { Routes } from "controllers";

export function createServer() {
  const app = fastify({ logger: true });

  Model.knex(Knex(knexSettings));

  app.register(Routes);

  return app;
}
