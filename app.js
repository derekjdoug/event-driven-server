const EventEmitter = require("events");
const chance = require("chance");
const Chance = new chance();

const caps = new EventEmitter();

function genCustomer() {
  return {
    time: Date.now(),
    status: "Ready for pickup",
    payload: {
      orderID: Chance.hash(),
      store: Chance.sentence({ words: 2}),
      address: `${Chance.city()}, ${Chance.state()}`,
    }
  }
}

function makeRequest(payload) {
  const { status, orderID, store, address } = payload;
  return {
    timeRequested: Date.now(),
    status,
    payload: {
      orderID,
      store,
      address,
    },
  }
}

function packageReady(payload) {
  const { status, payload } = payload;
  console.log(status);
  console.log(payload);
  caps.emit("packageRequest",)
};

function packagePickedUp(payload) {
  const { status, payload } = payload;
  return {
    status,
    payload,
  }
};

function packageDelivered(payload) {
  const { status, payload } = payload;
  return {
    status,
    payload,
  }
};

caps.addListener("requestMade", packageReady());
caps.addListener("packageRequest", (pickup) => console.log("Pick Up Request", pickup));
caps.addListener("packagePickedUp", (pickup) => console.log("Driver picked up package", pickup));
caps.addListener("packageDelivered", (pickup) => console.log("Package delivered", pickup));

// setInterval(() => {
//   caps.emit("requestMade", makeRequest("requesting pickup", "Hugo's Hoagies", "Bainbridge Manor"));
// }, 4000);

// setInterval(() => {
//   caps.emit("packageRequest", packageReady("request received", payload));
// }, 6000);

// setInterval(() => {
//   caps.emit("packagePickedUp", packagePickedUp("driver picked up", Date.now(), payload));
// }, 8000);

// setInterval(() => {
//   caps.emit("packageDelivered", packageDelivered("delivered successfully", Date.now(), payload));
// }, 10000);

caps.emit("requestMade", makeRequest(genCustomer()));
