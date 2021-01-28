import { FastifyInstance } from "fastify";

import { IProviders } from "services/provide";
import { FolderController } from "./folder";
import { TodoController } from "./todo";

export function Routes(app: FastifyInstance, options: IProviders, done: Function) {
  app.get("/health-check", (_, res) => {
    res.send({ status: "App is running and ready to accept connections!" });
  });

  TodoController(app, options, done);
  FolderController(app, options, done);

  done();
}
