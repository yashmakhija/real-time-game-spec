import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
const JWT_SECRET = "Kirais";

interface UserPosition {
  x: number;
  y: number;
}

interface Room {
  [userId: string]: UserPosition;
}

let ROOMS: { [roomId: string]: Room } = {};

export function configureWebSocket(server: any) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("New client conneceted");

    ws.on("message", (message: string) => {
      try {
        const parsedMessage = JSON.parse(message);
        handleWebSocketMessage(ws, parsedMessage);
      } catch (err) {
        ws.send(
          JSON.stringify({
            event: "error",
            data: {
              message: "Invalid message format",
            },
          })
        );
      }
    });
    ws.on("close", () => {
      console.log("Client Disconnected");
    });
  });
  console.log("Websocket server configured");
}

function handleWebSocketMessage(ws: WebSocket, message: any) {
  const { event, data } = message;

  switch (event) {
    case "join":
      handleJoinEvent(ws, data);
      break;
    case "position":
      handlePositionEvent(ws, data);
      break;
    default:
      ws.send(
        JSON.stringify({ event: "error", data: { message: "Unknown event" } })
      );
      break;
  }
}

function handleJoinEvent(
  ws: WebSocket,
  data: { roomId: string; accessToken: string }
) {
  const { roomId, accessToken } = data;

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET) as { username: string };

    const userId = decoded.username;

    if (!ROOMS[roomId]) {
      ROOMS[roomId] = {};
    }
    const initialPosition = {
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
    };

    ROOMS[roomId][userId] = initialPosition;

    ws.send(
      JSON.stringify({
        event: "ack",
        data: { x: initialPosition.x, y: initialPosition.y },
      })
    );
  } catch (err) {
    ws.send(
      JSON.stringify({
        event: "error",
        data: { message: "Invalid access token" },
      })
    );
  }
}

function handlePositionEvent(
  ws: WebSocket,
  data: { roomId: string; x: number; y: number }
) {
  const { roomId, x, y } = data;

  if (!ROOMS[roomId]) {
    ws.send(
      JSON.stringify({
        event: "error",
        data: { message: "Room does not exist" },
      })
    );
    return;
  }

  // Find the user in the room (assuming ws has a `userId` property attached during authentication)
  const userId = (ws as any).userId;
  if (!userId || !ROOMS[roomId][userId]) {
    ws.send(
      JSON.stringify({
        event: "error",
        data: { message: "User is not in the room" },
      })
    );
    return;
  }

  // Update user position
  const isValidPosition = validatePosition(x, y); // Assume you have some logic to validate the position
  const newPosition = isValidPosition ? { x, y } : ROOMS[roomId][userId];
  ROOMS[roomId][userId] = newPosition;

  // Broadcast position update to all users in the room
  broadcastPositionUpdate(roomId, userId, newPosition);
}

function broadcastPositionUpdate(
  roomId: string,
  userId: string,
  position: UserPosition
) {
  const room = ROOMS[roomId];

  for (const [otherUserId, _] of Object.entries(room)) {
    // Send the position update to all users in the room
    const message = {
      event: "position-update",
      data: {
        userId,
        x: position.x,
        y: position.y,
      },
    };

    // Assuming you keep track of connected WebSocket clients, send the update
    // wsClientMap[otherUserId].send(JSON.stringify(message)); // Example logic to send to other clients
  }
}

function validatePosition(x: number, y: number): boolean {
  // Implement your own position validation logic
  return x >= 0 && y >= 0;
}
