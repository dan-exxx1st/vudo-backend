import { FastifyInstance, FastifyRequest } from "fastify";
import { IProviders } from "services/provide";

interface IGetTodosQuery {
  folderId?: string;
}

type CreateRequest = FastifyRequest<{
  Body: { text: string; folderId: string };
}>;

type UpdateDoneRequest = FastifyRequest<{
  Body: {
    todoId?: string;
    done?: boolean;
  };
}>;

type DeleteTodo = FastifyRequest<{
  Body: {
    todoId?: string;
  };
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

  app.put("/todo", async (req: UpdateDoneRequest, res) => {
    if (req.body.todoId && req.body.done !== undefined) {
      const { todoId, done } = req.body;
      const updatedTodo = await todoService.updateTodoDone({ todoId, done });
      return res.send({ todo: updatedTodo });
    }

    return res.status(400).send({ message: "You didn't pass a todo if or done status." });
  });

  app.delete("/todo", async (req: DeleteTodo, res) => {
    if (req.body.todoId) {
      const { todoId } = req.body;

      const deletedTodo = await todoService.deleteTodo(todoId);

      if (deletedTodo instanceof Error) {
        return res.status(500).send({ message: deletedTodo.message });
      } else {
        return res.send({ todo: deletedTodo });
      }
    } else {
      return res.status(400).send({ message: "You didn't pass a todo id" });
    }
  });

  done();
}
