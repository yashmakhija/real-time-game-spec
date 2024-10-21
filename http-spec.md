HTTP Server Specification
Endpoints
Sign Up

Endpoint: /signup
Method: POST
Request Body:

username: The user's chosen username
password: The user's chosen password


Response: Session token

Create Room

Endpoint: /rooms
Method: POST
Request Body:

dimensions: The dimensions of the game room in the format "nxm"


Response: Room ID

Get User Info

Endpoint: /users/{userId}
Method: GET
Response:

username: The user's username
avatarUrl: The URL of the user's avatar image



Update Avatar

Endpoint: /users/{userId}/avatar
Method: PUT
Request Body:

avatarImage: The new avatar image file


Response:

avatarUrl: The URL of the updated avatar image