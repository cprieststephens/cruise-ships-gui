const Ship = require("../src/ship.js");

describe("Ship", () => {
  describe("with ports and itinerary", () => {
    let london;
    let liverpool;
    let itinerary;
    let ship;

    beforeEach(() => {
      london = { name: "London", ships: [], addShip: jest.fn(), removeShip: jest.fn() };
      liverpool = { name: "Liverpool", ships: [], addShip: jest.fn(), removeShip: jest.fn() };
      itinerary = { ports: [london, liverpool] };
      ship = new Ship(itinerary);
    });

    it("can be instantiated", () => {
      expect(ship).toBeInstanceOf(Object);
    });

    it("sets previous port as null", () => {
      expect(ship.previousPort).toEqual(null);
    });

    it("has a starting port", () => {
      expect(ship.currentPort).toBe(london);
    });

    it("gets added to port on instantiation", () => {
      expect(london.addShip).toHaveBeenCalledWith(ship);
    }); 

    it("can set sail", () => {
      ship.setSail();
      expect(ship.currentPort).toBeFalsy();
      expect(london.removeShip).toHaveBeenCalledWith(ship);
    });

    it("can't sail further than its itinerary", () => {
      ship.setSail();
      ship.dock();
      expect(() => ship.setSail()).toThrowError("End of itinerary reached");
    });
    
    it("can dock at different port", () => {
      ship.setSail();
      ship.dock();
      expect(ship.currentPort).toBe(liverpool);
      expect(liverpool.addShip).toHaveBeenCalledWith(ship);
    });
  });
});






