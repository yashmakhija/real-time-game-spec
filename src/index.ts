import express from "express";
import routesRouter from "./routes/routes";

const app = express();

app.use(express.json());

app.use("/", routesRouter);

const PORT = 8090;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
