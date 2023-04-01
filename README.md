# Cruise Ships

I completed this guided project using JavaScript as a part of Command Shift bootcamp. I wrote the unit tests using Jest.

Features:
- Users can create a series of ports, add them to an itinerary and create a cruise ship.
- The ship can set sail and dock at different ports.

## Getting started

### Clone this repository

- Create a fork of this repo.
- Clone your copy of the repo using the command: `git clone git@github.com:*your-github-username*/*repo-name*.git`

### Install the project dependencies

Use the command `npm install` to download the project's dependencies and create a node_modules folder.

### Running the tests

Use the command `npm test` to run the Jest tests for this project.

### How to play

- To open the Node REPL from your terminal, type `node` and press `return`.
- Return `const Itinerary = require('./src/itinerary.js');`, `const Port = require('./src/port.js');` and `const Ship = require('./src/ship.js');`to access the files where the project's code is stored.
- To create the ports for your itinerary return `const *port* = new Port("*portName*");` e.g. `const liverpool = new Port("Liverpool");`.
- Once you've created multiple ports for your ship to sail to, you need to create an itinerary. The ports you've created need to be passed in as arguments. Return `const *itinerary* = new Itinerary([port, port, port]);` e.g. `const itinerary = new Itinerary([liverpool, london, dover]);`.
- You can then create your ship and pass in the itinerary as an argument. Return `const *ship* = new Ship(*itinerary*)` e.g. `const Britannia = new Ship(itinerary)`.
- Return `*ship*.setSail` to leave a port e.g. `Britannia.setSail`.
- Return `*ship*.dock` to dock at a port e.g. `Britannia.dock`.
- You will receive an error message if you try to sail further than the last port on the itinerary. 
- To exit the Node REPL use `ctrl` + `d`.






