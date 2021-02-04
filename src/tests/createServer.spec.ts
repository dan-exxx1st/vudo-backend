import { createServer } from "scripts/createServer";

describe("CreateServer", () => {
  it("should create a server", () => {
    const server = createServer();

    expect(server).toBeDefined();
  });
});
