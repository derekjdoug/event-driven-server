const EventEmitter = require("events");
const chance = require("chance");
const Chance = new chance();

const caps = new EventEmitter();

//Courtesy of Hugo, sleep helper allows delay between emits
function sleep(amt) {
  return new Promise((resolve) => setTimeout(resolve, amt));
}

//Generates random name to use as delivery driver
function randomDriver() {
  return Chance.name();
}

convertTimestamp = (timestamp) => {
  options = {
    hour: 'numeric', minute: 'numeric',
    weekday: 'long', month: 'long', day: 'numeric',
    hour12: true,
  }
  let date = new Intl.DateTimeFormat('en-EN', options).format(timestamp);
  return date;
}

function genCustomer() {
  sto
  return {
    status: "Ready for pickup",
    payload: {
      time: Date.now(),
      orderID: Chance.hash(),
      store: Chance.company(),
      address: `${Chance.city()}, ${Chance.state()}`,
    }
  }
}

function makeRequest(payload) {
  return {
    timeRequested: Date.now(),
    status : payload.status,
    payload: payload.payload,
  }
}

async function packageReady(package) {
  console.log(`Package Ready`, package);
  await sleep(2000);
  caps.emit("packageRequest", package)
};

async function packagePickedUp(package) {
  driver = randomDriver();
  package.status = `Picked up at ${convertTimestamp(Date.now())} by ${driver}`;
  console.log(`Picked up the package`, package);
  await sleep(2000);
  caps.emit("packagePickedUp", package, driver)
};

async function packageDelivered(package, driver) {
  package.status = `Delivered at ${convertTimestamp(Date.now())} by ${driver}`;
  console.log(`Delivered the package`, package);
  await sleep(2000);
  caps.emit("packageDelivered", package);
};

caps.addListener("requestMade", packageReady);
caps.addListener("packageRequest", packagePickedUp);
caps.addListener("packagePickedUp", packageDelivered);

caps.emit("requestMade", makeRequest(genCustomer()));
