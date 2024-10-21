WebSocket Server Specification
Events
Join Room

Event: join
Request Data:

roomId: The ID of the room the user wants to join


Response:

ack event with the user's spawn position



Update Position

Event: position
Request Data:

x: The new X coordinate of the user's position
y: The new Y coordinate of the user's position


Responses:

If valid position: Broadcast the new position to other users in the room
If invalid position: position-update event with the user's original position



Broadcast Position Update

Event: Broadcasted to all users in the room
Data:

userId: The ID of the user whose position has been updated
x: The new X coordinate of the user's position
y: The new Y coordinate of the user's position