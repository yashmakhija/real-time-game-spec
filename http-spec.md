# HTTP Server Specification

## Endpoints

### 1. **Sign Up**

- **Endpoint**: `/signup`
- **Method**: `POST`
- **Request Body**:
  - `username`: The user's chosen username
  - `password`: The user's chosen password
- **Response**:
  - `sessionToken`: The session token for the user

---

### 2. **Create Room**

- **Endpoint**: `/rooms`
- **Method**: `POST`
- **Header**: `Authorization: Bearer {sessionToken}`
- **Request Body**:
  - `dimensions`: The dimensions of the game room in the format "nxm"
- **Response**:
  - `roomId`: The unique ID of the created room

---

### 3. **Get User Info**

- **Endpoint**: `/users/{userId}`
- **Method**: `GET`
- **Response**:
  - `username`: The user's username
  - `avatarUrl`: The URL of the user's avatar image

---

### 4. **Update Avatar**

- **Endpoint**: `/users/{userId}/avatar`
- **Method**: `PUT`
- **Header**: `Authorization: Bearer {sessionToken}`
- **Request Body**:
  - `avatarImage`: The new avatar image file
- **Response**:
  - `avatarUrl`: The URL of the updated avatar image
