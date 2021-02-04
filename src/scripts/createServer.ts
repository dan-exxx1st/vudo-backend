import fastify from "fastify";
import fastifyCors from "fastify-cors";
import Knex from "knex";
import { Model } from "objection";

import { createConfig } from "helpers/createConfig";
import knexSettings from "../knexfile";
import { Routes } from "controllers";
import { CreateProvider, IProviders } from "services/provide";

export function createServer() {
  const { NODE_ENV } = createConfig();
  const app = fastify({ logger: NODE_ENV !== "test" && true });
  const providers = CreateProvider();

  app.register(fastifyCors);

  //@ts-ignore
  Model.knex(Knex(knexSettings));

  app.register<IProviders>(Routes, { prefix: "/api", providers });

  return app;
}
