import { Response, Request } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "Kirais";

interface Room {
  roomId: string;
  dimension: string;
}

interface User {
  username: string;
  password: string;
  avtaarUrl?: string;
}

let USERS: { [username: string]: User } = {};
let ROOMS: { [roomId: string]: Room } = {};

export function signupController(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      msg: `You haven't provide either username or password `,
    });
    return;
  }

  if (USERS[username]) {
    res.status(409).json({
      msg: `This username is already exist`,
    });
    return;
  }

  USERS[username] = { username, password };

  const tokensign = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  const token = `Bearer ${tokensign}`;

  res.status(201).json({
    sessionToken: token,
    userId: username,
  });
}

export function getUserInfroController(req: Request, res: Response) {
  const userId = req.params.userId;

  const user = USERS[userId];

  if (!user) {
    res.status(404).json({
      msg: `user doesn't exist`,
    });
    return;
  }
  res.status(200).json({
    username: user.username,
    avtaarUrl: user.avtaarUrl,
  });
}

export function updateAvtarController(req: Request, res: Response) {
  const userId = req.params.userId;
  const { avtaarUrl } = req.body;

  const user = USERS[userId];

  if (!user) {
    res.status(404).json({
      msg: `user doesn't exist`,
    });
    return;
  }

  user.avtaarUrl = avtaarUrl;

  res.status(200).json({
    avtaarUrl,
  });
}
