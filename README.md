# Periodic Tables: Restaurant Reservation System
Periodic Tables is a reservation system designed directly for restaurant personnel. The application includes features to create, edit, and keep track of reservations and tables.

## Demo
A live version of the app can be accessed here: https://bcm-frontend.herokuapp.com/dashboard
## Installation
1. Run `npm install` from the root folder to install project dependencies.
2. Run `npm run start` to start the application server.
## Features
### Displays reservations and tables for given date
![Dashboard](/Screen%20Shot%202022-09-19%20at%204.13.36%20PM.png "Dashboard")
### Reservations can be assigned to and seated at tables
![Table Assignment](/Screen%20Shot%202022-09-19%20at%204.15.49%20PM.png "Table Assignment")
### New reservations can be added
![Adding Reservation](/Screen%20Shot%202022-09-19%20at%204.16.16%20PM.png "Adding Reservation")
### Reservations can be easily searched by phone number
![Search by number](/Screen%20Shot%202022-09-19%20at%204.16.54%20PM.png "Search by number")
### New tables can be added
![Add Table](/Screen%20Shot%202022-09-19%20at%204.17.31%20PM.png "Add Table")
### Each reservation is editable
![Edit Reservation](/Screen%20Shot%202022-09-19%20at%204.17.51%20PM.png "Edit Reservation")
## Test Cases
`npm test` runs all tests
`npm run test:backend` runs all backend tests
`npm run test:frontend` runs all frontend tests
`npm run test:e2e` runs end to end tests
a number parameter 1-8 can also be provided (as in, `npm run test:1:backend`) to run a specfic set of tests
specifics on tests can be found within the test files


This app was made with React.js, Postgresql, Express, and Node.
Further documentation can be found here:
https://expressjs.com/en/api.html
https://reactjs.org/docs/getting-started.html
https://www.postgresql.org/docs/
https://nodejs.org/en/docs/
