
## WebSocket Server Specification

### Events

---

#### **Join Room**
```
{
    event: "join",
    data: {
        roomId: string,
        accessToken: string
    }
}
```
- **Event**: `join`
- **Request Data**:
  - `roomId`: The ID of the room the user wants to join

- **Response**:
Acknowledgement (`ack`) event with the user's spawn position
```
{
    event: "ack",
    data: {
        x: number,
        y: number
    }
}
```
---

#### **Update Position**

- **Event**: `position`
- **Request Data**:
```
{
    event: "position",
    data: {
        x: number,
        y: number
    }
}
```
  - `x`: The new X coordinate of the user's position
  - `y`: The new Y coordinate of the user's position

- **Responses**:
  - **If valid position**: Broadcast the new position to other users in the room
  ```
    {
        event: "position-update",
        data: {
            userId: string,
            x: number,
            y: number
        }
    }
  ```
  - **If invalid position**: Send a `position-update` event with the user's original position
  ```
  {
      event: "position-update",
      data: {
          userId: string,
          x: number,
          y: number
      }
  }
  ```

---

#### **Broadcast Position Update**

- **Event**: Broadcasted to all users in the room
- **Data**:
  - `userId`: The ID of the user whose position has been updated
  - `x`: The new X coordinate of the user's position
  - `y`: The new Y coordinate of the user's position
```
{
    event: "position-update",
    data: {
        userId: string,
        x: number,
        y: number
    }
}```
