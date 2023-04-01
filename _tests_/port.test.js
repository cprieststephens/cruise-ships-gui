const Port = require("../src/port.js");

describe("Port", () => {
  describe("with ships", () => {
    let port;
    let MaryRose;
    let Britannia;

    beforeEach(() => {
      port = new Port("London");
      MaryRose = jest.fn();
      Britannia = jest.fn();
    });

    it("instantiates Port object", () => {
      expect(new Port()).toBeInstanceOf(Object);
    });
      
    it("sets the name property", () => {
      expect(port.name).toEqual("London");
    });
    
    it("has a ships property", () => {
      expect(port.ships).toEqual([]);
    });

    it("can have ships added", () => {
      port.addShip(MaryRose);
      expect(port.ships).toContain(MaryRose);
    });

    it("can have ships removed", () => {
      port.addShip(MaryRose);
      port.addShip(Britannia);
      port.removeShip(MaryRose);
      expect(port.ships).toEqual([Britannia]);
    });
  }); 
});


