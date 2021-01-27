import { FastifyInstance, FastifyRequest } from "fastify";

import { TodoRepository } from "repositories/todo";

export function TodoController(app: FastifyInstance, options: {}, done: Function) {
  const todoRepository = new TodoRepository();
  app.get("/todos", async (_, res) => {
    console.log(await todoRepository.find({ done: false }));
    res.send({ status: "Todos!" });
  });

  type CustomRequest = FastifyRequest<{
    Body: { text: string };
  }>;

  app.post("/todo", async (req: CustomRequest, res) => {
    if (req.body && req.body.text) {
      const { text } = req.body;
      const newTodo = await todoRepository.create(text);
      return res.send({ todo: newTodo });
    } else {
      return res.send({ message: "Text option was not found." });
    }
  });

  done();
}
