Welcome to airline portal site : FlyMe

 

### To run this app

1. npm install
2. npm start

Notes : npm start runs three commands

1. Starts application server on Port 4000
2. Starts JSON server  with db.json
3. Start 3000 port by mounting auth router on JSON Server.

Note :- JSON Server is running on port = 3000
        Application is running on port = 4000

### Tech Stack

1. Design : Material UI
2. Linting : Eslint
3. Code -formatting : Prettier
4. State Management : Local state, hooks and Redux
5. Almost Used Function components
6. Backend - Json-server


Notes :  Estensively used Hooks in the project.

### About Project - Airline

1. There are two roles - Admin and Staff

Admin :

1. Admin can edit passenger details.
2. Admin can see passenger details like Passenger Name, seat no. , ancillary services.
3. Admin Have options to manage ancillary services,shop Meal option per flight.

Staff : Check-In

1. Staff can see flight details and corresponding passengers details.
2. Staff can check-in passenger by booking available seats.
3. Staff can also undo check-in.
4. Staff can update seat number from passenger-list.

Staff : In-Flight

1. Staff can  update ancillary services,special meals and shop Items.


Note : Find Admin and Staff credentails in D:\React\ReactProject201\tools\users.json.