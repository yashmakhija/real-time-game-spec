import http from "http";
import express, { Application } from "express";
import routesRouter from "./routes/routes";
import { configureWebSocket } from "./websocket";

const app: Application = express();

app.use(express.json());

app.use("/", routesRouter);

const server = http.createServer(app);

configureWebSocket(server);

const PORT = 8090;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
