const Itinerary = require("../src/itinerary.js");

describe("Itinerary", () => {
  it("instantiates Itinerary object", () => {
    expect(new Itinerary()).toBeInstanceOf(Object);
  });

  it("can have ports", () => {
    const london = jest.fn();
    const liverpool = jest.fn();
    const itinerary = new Itinerary([london, liverpool]);
    expect(itinerary.ports).toEqual([london, liverpool]);
  });
});