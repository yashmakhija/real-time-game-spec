"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const roomController_1 = require("../controller/roomController");
const routesRouter = express_1.default.Router();
routesRouter.post("/signup", userController_1.signupController);
routesRouter.get("/users/:userId", userController_1.getUserInfroController);
routesRouter.put("/users/:userId/avatar", userController_1.updateAvtarController);
routesRouter.post("/rooms", roomController_1.createRoomController);
exports.default = routesRouter;
