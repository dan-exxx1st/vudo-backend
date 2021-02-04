import { FastifyInstance } from "fastify";
import request from "supertest";
import { createServer } from "scripts/createServer";
import { MockCreateProvider } from "tests/__mocks__/services";

jest.mock("services/provide", () => ({
  CreateProvider: jest.fn(() => ({
    ...MockCreateProvider(),
  })),
}));

describe("Todo e2e tests", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = createServer();
    await app.ready();
  });

  afterAll(() => {
    app.close();
  });

  describe("GET /api/todos", () => {
    it("should return a list of todos by folder id", async () => {
      const response = await request(app.server).get("/api/todos?folderId=1");

      expect(response.body.todos).toHaveLength(1);
    });

    it("should return an empty list if folder id incorrect", async () => {
      const response = await request(app.server).get("/api/todos?folderId=INVALID_ID");
      expect(response.body.todos).toHaveLength(0);
    });

    it("should return a list of all todos", async () => {
      const response = await request(app.server).get("/api/todos");
      expect(response.body.todos).toHaveLength(2);
    });
  });

  describe("POST /api/todo", () => {
    it("should return a new todo", async () => {
      const todoRequestData = {
        text: "New test todo",
        folderId: "1",
      };

      const response = await request(app.server).post("/api/todo").send(todoRequestData);

      expect(response.status).toEqual(200);
      expect(response.body.todo.id).toBeDefined();
    });

    it("should return response with status code 400 if request doesn't contain a folderId or text", async () => {
      const response = await request(app.server).post("/api/todo").send({});

      expect(response.status).toEqual(400);
    });

    it("should return response with status code 500 if folder was not found", async () => {
      const invalidData = {
        text: "text invalid",
        folderId: "INVALID_FOLDER_ID",
      };
      const response = await request(app.server).post("/api/todo").send(invalidData);

      expect(response.status).toEqual(500);
    });
  });
});
