(function exportController() { 

  class Controller {
    constructor(ship) {
      this.ship = ship;
      this.initialiseSea();
      document.querySelector("#addbutton").addEventListener("click", () => {
        this.addPort();
        this.renderPorts(ship.itinerary.ports);
      });
      document.querySelector("#sailbutton").addEventListener("click", () => {
        this.setSail();
        document.querySelector("#sailbutton").disabled = true;
        document.querySelector("#addbutton").disabled = true;
      });
    }

    initialiseSea() {
      const backgrounds = [
        "./images/water0.png",
        "./images/water1.png",
      ];
      let backgroundIndex = 0;
      window.setInterval(() => {
        document.querySelector("#viewport").style.backgroundImage = `url("${backgrounds[backgroundIndex % backgrounds.length]}")`;
        backgroundIndex += 1;
      }, 1000);
    }

    resetContainer(parent){
      while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
      }
    }

    renderPorts(ports) {
      const portsElement = document.querySelector("#ports");
      portsElement.style.width = "0px";
      this.resetContainer(portsElement);
      ports.forEach((port, index) => {
        const newPortElement = document.createElement("div");
        newPortElement.className = "port";
        newPortElement.dataset.portName = port.name;
        newPortElement.dataset.portIndex = index;
        portsElement.appendChild(newPortElement);
        const portsElementWidth = parseInt(portsElement.style.width, 10);
        portsElement.style.width = `${portsElementWidth + 256}px`;
      })
    }

    renderShip() {
      const ship = this.ship;
      const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const portElement = document.querySelector(`[data-port-index="${shipPortIndex}"]`);
      if (!portElement) return;
      const shipElement = document.querySelector("#ship");
      shipElement.style.top = `${portElement.offsetTop + 32}px`;
      shipElement.style.left = `${portElement.offsetLeft - 32}px`;
    }

    setSail() {
      const ship = this.ship;
      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;
      const nextPortElement = document.querySelector(`[data-port-index="${nextPortIndex}"]`);  
      if (!nextPortElement) {
        this.renderMessage("End of the line!");
        return;
      } else {
        this.renderMessage(`Now departing ${ship.currentPort.name}`);
      }
      const shipElement = document.querySelector("#ship");
      const sailInterval = setInterval(() => {
        const shipLeft = parseInt(shipElement.offsetLeft, 10);
        if (shipLeft === (nextPortElement.offsetLeft - 32)) {
          document.querySelector("#sailbutton").disabled = false;
          ship.setSail();
          ship.dock();
          clearInterval(sailInterval);
          this.renderMessage(`Now arriving at ${ship.currentPort.name}`);
          if (currentPortIndex + 1 === ship.itinerary.ports.length -1) {
            this.updateDisplay(`Current Port: ${ship.currentPort.name}`, `Next Port: N/A End of the line!`);
          } else {
            this.updateDisplay(`Current Port: ${ship.currentPort.name}`, `Next Port: ${ship.itinerary.ports[nextPortIndex + 1].name}`);
          }
        }
        shipElement.style.left = `${shipLeft + 1}px`;
      }, 20);
    }

    renderMessage(message) {
      const messageElement = document.createElement("div");
      messageElement.id = "message";
      messageElement.innerHTML = message;
      const viewport = document.querySelector("#viewport");
      viewport.appendChild(messageElement); 
      setTimeout(() => {
        viewport.removeChild(messageElement)
      }, 2000);
    }

    updateDisplay(currentPortInformation, nextPortInformation) {
      const currentPortUpdate = document.querySelector("#current-port");
      const nextPortUpdate = document.querySelector("#next-port");
      currentPortUpdate.innerHTML = currentPortInformation;
      nextPortUpdate.innerHTML = nextPortInformation;
    }

    addPort() {
      const ship = this.ship;
      const newPortName = document.getElementById("port-name").value;
      const port = new Port(newPortName);
      ship.itinerary.ports.push(port);
      if (!ship.currentPort) {
        ship.currentPort = ship.itinerary.ports[0];
        ship.currentPort.addShip(ship);
      } 
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
}());