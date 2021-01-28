import { FastifyInstance, FastifyRequest } from "fastify";
import { IProviders } from "services/provide";

type ICreateRequest = FastifyRequest<{
  Body: {
    name: string;
  };
}>;

export function FolderController(app: FastifyInstance, options: IProviders, done: Function) {
  const { folderService } = options.providers;

  app.get("/folders", async (_, res) => {
    const folders = await folderService.findAll();

    return res.send({ folders });
  });

  app.post("/folder", async (req: ICreateRequest, res) => {
    if (req.body && req.body.name) {
      const { name } = req.body;
      const folder = await folderService.createFolder(name);
      return res.send({ folder });
    } else {
      return res.status(400).send({ message: "You didn't pass a name parameter." });
    }
  });

  done();
}
