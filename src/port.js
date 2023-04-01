(function exportPort() {

  class Port {
    constructor(name) {
      this.name = name;
      this.ships = [];
    }

    addShip(ship) {
      return this.ships.push(ship);
    }

    removeShip(shipToRemove) {
      const shipIndex = this.ships.indexOf(shipToRemove);
      return this.ships.splice(shipIndex, 1);
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Port;
  } else {
    window.Port = Port;
  }
}());


