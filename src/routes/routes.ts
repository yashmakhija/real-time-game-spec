import Express from "express";
import {
  getUserInfroController,
  signupController,
  updateAvtarController,
} from "../controller/userController";
import { createRoomController } from "../controller/roomController";

const routesRouter = Express.Router();

routesRouter.post("/signup", signupController);
routesRouter.get("/users/:userId", getUserInfroController);
routesRouter.put("/users/:userId/avatar", updateAvtarController);

routesRouter.post("/rooms", createRoomController);

export default routesRouter;
