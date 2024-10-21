import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

interface Room {
  roomId: string;
  dimensions: string;
}

let ROOMS: { [roomId: string]: Room } = {};

export function createRoomController(req: Request, res: Response) {
  const { dimensions } = req.body;

  if (!dimensions || !/^\d+x\d+$/.test(dimensions)) {
    res
      .status(400)
      .json({ message: "Invalid room dimensions. Format should be 'nxm'." });
    return;
  }

  const roomId = uuidv4();

  ROOMS[roomId] = { roomId, dimensions };

  res.status(201).json({ roomId });
}
