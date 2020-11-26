export function Routes(app, _, done) {
  app.get("/health-check", (_, res) => {
    res.send({ status: "App is running and ready to accept connections!" });
  });

  done();
}
