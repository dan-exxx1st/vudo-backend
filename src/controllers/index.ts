import { FastifyInstance } from "fastify";
import { TodoController } from "./todo";

export function Routes(app: FastifyInstance, _: {}, done: Function) {
  app.get("/health-check", (_, res) => {
    res.send({ status: "App is running and ready to accept connections!" });
  });

  TodoController(app, _, done);

  done();
}
