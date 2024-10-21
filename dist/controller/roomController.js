"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoomController = createRoomController;
const uuid_1 = require("uuid");
let ROOMS = {};
function createRoomController(req, res) {
    const { dimensions } = req.body;
    if (!dimensions || !/^\d+x\d+$/.test(dimensions)) {
        res
            .status(400)
            .json({ message: "Invalid room dimensions. Format should be 'nxm'." });
        return;
    }
    const roomId = (0, uuid_1.v4)();
    ROOMS[roomId] = { roomId, dimensions };
    res.status(201).json({ roomId });
}
