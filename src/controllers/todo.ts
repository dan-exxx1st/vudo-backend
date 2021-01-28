import { FastifyInstance, FastifyRequest } from "fastify";
import { IProviders } from "services/provide";

type CustomRequest = FastifyRequest<{
  Body: { text: string; folderId: string };
}>;

export function TodoController(app: FastifyInstance, options: IProviders, done: Function) {
  const { todoService } = options.providers;

  app.get("/todos", async (_, res) => {
    const todos = await todoService.findAll();
    return res.send({ todos });
  });

  app.post("/todo", async (req: CustomRequest, res) => {
    if (req.body && req.body.text && req.body.folderId) {
      const { text, folderId } = req.body;
      const newTodo = await todoService.createTodo({ text, folderId });
      return res.send({ todo: newTodo });
    } else {
      return res.status(400).send({ message: "You didn't pass a text or folderId parameter." });
    }
  });

  done();
}
