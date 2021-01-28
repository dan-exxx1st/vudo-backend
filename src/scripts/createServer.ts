import fastify from "fastify";
import fastifyCors from "fastify-cors";
import Knex from "knex";
import { Model } from "objection";

import knexSettings from "../knexfile";
import { Routes } from "controllers";
import { CreateProvider, IProviders } from "services/provide";

export function createServer() {
  const app = fastify({ logger: true });
  const providers = CreateProvider();

  app.register(fastifyCors);

  Model.knex(Knex(knexSettings));

  app.register<IProviders>(Routes, { prefix: "/api", providers });

  return app;
}
