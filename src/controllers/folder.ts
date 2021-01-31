import { FastifyInstance, FastifyRequest } from "fastify";
import { IProviders } from "services/provide";

type CreateRequest = FastifyRequest<{
  Body: {
    name: string;
    color: string;
  };
}>;

type DeleteTodo = FastifyRequest<{
  Body: {
    id: string;
  };
}>;

export function FolderController(app: FastifyInstance, options: IProviders, done: Function) {
  const { folderService } = options.providers;

  app.get("/folders", async (_, res) => {
    const folders = await folderService.findAll();

    return res.send({ folders });
  });

  app.post("/folder", async (req: CreateRequest, res) => {
    if (req.body && req.body.name && req.body.color) {
      const { name, color } = req.body;
      const folder = await folderService.createFolder({ name, color });
      return res.send({ folder });
    } else {
      return res.status(400).send({ message: "You didn't pass a name or color parameters." });
    }
  });

  app.delete("/folder", async (req: DeleteTodo, res) => {
    if (req.body && req.body.id) {
      const { id } = req.body;
      console.log(id);

      const deletedFolder = await folderService.deleteFolder(id);
      return res.send({ folder: deletedFolder });
    } else {
      return res.status(400).send({ message: "You don't pass a folder id in parameters.'" });
    }
  });

  done();
}
