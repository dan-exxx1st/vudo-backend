import { createServer } from "./scripts/createServer";
import { createConfig } from "./helpers/createConfig";

if (require.main !== "module") {
  const server = createServer();
  const config = createConfig();

  server.listen(config.APP_PORT, function (err, address) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`server listening on ${address}`);
  });
}
