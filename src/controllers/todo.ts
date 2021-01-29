import { FastifyInstance, FastifyRequest } from "fastify";
import { IProviders } from "services/provide";

interface IGetTodosQuery {
  folderId?: string;
}

type CreateRequest = FastifyRequest<{
  Body: { text: string; folderId: string };
}>;

export function TodoController(app: FastifyInstance, options: IProviders, done: Function) {
  const { todoService } = options.providers;

  app.get<{
    Querystring: IGetTodosQuery;
  }>("/todos", async (req, res) => {
    let todos = [];

    if (req.query.folderId) {
      todos = await todoService.findAllByFolderId(req.query.folderId);
    } else {
      todos = await todoService.findAll();
    }
    return res.send({ todos });
  });

  app.post("/todo", async (req: CreateRequest, res) => {
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
