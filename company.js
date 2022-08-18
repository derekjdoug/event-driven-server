const { io } = require("socket.io-client");
const { sleep } = require("./helper");
const chance = require("chance");
const Chance = new chance();

const socket = io("ws://localhost:3500");

function reqHelper() {
  function genCustomer() {
    return {
      status: "Ready for pickup",
      payload: {
        time: Date.now(),
        orderID: Chance.hash(),
        store: Chance.company(),
        address: `${Chance.city()}, ${Chance.state()}`,
      },
    }
  }
  const customer = genCustomer();

  function makeRequest(customer) {
    return {
      timeRequested: Date.now(),
      status: customer.status,
      payload: customer.payload,
    }
  }
  const package = makeRequest(customer);
  packageReady(package);
}

async function packageReady(package) {
  console.log(`Package Ready`, package);
  await sleep(2000);
  socket.emit("vendorRequest", package)
};

socket.on("requestMade", () => {
  reqHelper();
});

socket.on("pickUpNotification", (package, driver) => {
  console.log("gee, thanks");
  socket.emit("goDeliver", package, driver, console.log("proceed with delivery"))
});

socket.on("deliveryConfirmation", (package) => {
  console.log(package);
  console.log("Customer Received Product");
});

module.exports = {
  packageReady: packageReady,
}
