(function exportController() { 

  class Controller {
    constructor(ship) {
      this.ship = ship;
      this.initialiseSea();

      document.querySelector("#addbutton").addEventListener("click", () => {
        this.addPort();
      });

      document.querySelector("#sailbutton").addEventListener("click", () => {
        this.setSail();
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
        const portsElementWidth = parseInt(portsElement.style.width, 10);

        newPortElement.className = "port";
        newPortElement.dataset.portName = port.name;
        newPortElement.dataset.portIndex = index;

        portsElement.appendChild(newPortElement);
        portsElement.style.width = `${portsElementWidth + 256}px`;
      })
    }

    renderShip() {
      const ship = this.ship;
      const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const portElement = document.querySelector(`[data-port-index="${shipPortIndex}"]`);
      const shipElement = document.querySelector("#ship");

      if (!portElement) return;
      
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
          document.querySelector("#addbutton").disabled = false;
          ship.setSail();
          ship.dock();
          clearInterval(sailInterval);
          this.renderMessage(`Now arriving at ${ship.currentPort.name}`);
          this.updateDisplay();
        }

        shipElement.style.left = `${shipLeft + 1}px`;
      }, 20);

      document.querySelector("#sailbutton").disabled = true;
      document.querySelector("#addbutton").disabled = true;
    }

    renderMessage(message) {
      const messageElement = document.createElement("div");
      const container = document.querySelector("#container");

      messageElement.id = "message";
      messageElement.innerHTML = message;
      
      container.appendChild(messageElement); 
      setTimeout(() => {
        container.removeChild(messageElement)
      }, 2000);
    }

    updateDisplay() {
      const currentPort =  this.ship.currentPort;
      const ports = this.ship.itinerary.ports;
      const nextPort = ports[ports.indexOf(currentPort) +1] || {name: "N/A End of the line!"};

      const currentPortUpdate = document.querySelector("#current-port");
      const nextPortUpdate = document.querySelector("#next-port");
      currentPortUpdate.innerHTML = `Current Port: ${currentPort.name}`;
      nextPortUpdate.innerHTML = `Next Port: ${nextPort.name}`;

      if (nextPortIndex === ports.length -1) {
        this.updateDisplay(`Current Port: ${currentPort.name}`, `Next Port: N/A End of the line!`);
      } else {
        this.updateDisplay(`Current Port: ${currentPort.name}`, `Next Port: ${ports[nextPortIndex + 1].name}`);
      }
    }

    addPort() {
      const ports = this.ship.itinerary.ports;
      const newPortName = document.getElementById("port-name").value;
      const port = new Port(newPortName);

      ports.push(port);

      if (!ship.currentPort) {
        ship.currentPort = ports[0];
        ship.currentPort.addShip(ship);
      } 
      
      this.renderPorts(ports);
      this.updateDisplay()
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
}());