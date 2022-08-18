const { io } = require("socket.io-client");
const chance = require("chance");
const Chance = new chance();
const { sleep, convertTimestamp } = require("./helper");

const socket = io("ws://localhost:3500");

//Generates random name to use as delivery driver
function randomDriver() {
  return Chance.name();
}

async function packagePickedUp(package) {
  driver = randomDriver();
  package.status = `Picked up at ${convertTimestamp(Date.now())} by ${driver}`;
  console.log(`Picked up the package`, package);
  await sleep(2000);
  socket.emit("packagePickedUp", package, driver)
};

async function packageDelivered(package, driver) {
  package.status = `Delivered at ${convertTimestamp(Date.now())} by ${driver}`;
  console.log(`Delivered the package`, package);
  await sleep(2000);
  socket.emit("packageDelivered", package);
};

socket.on("vendorRequest", packagePickedUp);
socket.on("goDeliver", packageDelivered);

module.exports = {
  packagePickedUp: packagePickedUp,
  packageDelivered: packageDelivered,
}
