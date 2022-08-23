const { io } = require("socket.io-client");
const chance = require("chance");
const Chance = new chance();
const { sleep, convertTimestamp } = require("./helper");
const { request } = require("http");

const socket = io("ws://localhost:3500");

let requestQueue;

function requestQueueHandler(package) {
  requestQueue = package;
  console.log(package);
  console.log(requestQueue);
  if(requestQueue.length){
    for(let i = 0; i < requestQueue.length; i++){
      packagePickedUp(requestQueue.shift());
    }
  }
}

let driverPool = [
  "Santiago Salazar",
  "Todd Toddington",
  "Blaize Kensington III",
  "Greg",
  "Hugort Hershey Thampton",
  "Jimmy Pneumomultitropicsilicavolton",
];

async function packagePickedUp(package) {
  driver = driverPool.shift();
  package.status = `Picked up at ${convertTimestamp(Date.now())} by ${driver}`;
  console.log(`Picked up the package`, package);
  await sleep(2000);
  socket.emit("packagePickedUp", package, driver)
};

async function packageDelivered(package, driver) {
  driverPool.push(driver);
  package.status = `Delivered at ${convertTimestamp(Date.now())} by ${driver}`;
  console.log(`Delivered the package`, package);
  await sleep(2000);
  socket.emit("packageDelivered", package);
};

socket.on("vendorRequests", requestQueueHandler);
socket.on("goDeliver", packageDelivered);
socket.on("connect", () => {
  socket.emit("sendRequests")
})

module.exports = {
  packagePickedUp: packagePickedUp,
  packageDelivered: packageDelivered,
}
