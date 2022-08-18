const socketIo = require("socket.io");
const chance = require("chance");
const Chance = new chance();

const io = socketIo(3500);

const allClients = [];

io.on("connection", (client) => {
  allClients.push(client);
  client.on("vendorRequest", (package) => {
    io.emit("vendorRequest", package)
  });
  client.on("packagePickedUp", (package, driver) => {
    io.emit("pickUpNotification", package, driver);
  })
  client.on("goDeliver", (package) => {
    io.emit("goDeliver", package, console.log("Confirmation sent to parcel service"));
  })
  client.on("packageDelivered", (package) => {
    io.emit("deliveryConfimation", package, console.log("Confirmation to Vendor"));
  })
});

setInterval(() => {
  console.log("Generating a Customer");
  io.emit("requestMade", console.log("making request"));
}, 8000);
