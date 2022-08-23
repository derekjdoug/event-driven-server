const socketIo = require("socket.io");
const chance = require("chance");
const Chance = new chance();

const caps = socketIo(3500);

const allClients = [];
let deliveryNotices = ["Deliveries:"];
let packageRequests = [];

function deliveryHandler(package){
  deliveryNotices.push(package);
  console.log(package);
}

caps.on("connection", (client) => {
  allClients.push(client);
  if(deliveryNotices !== undefined){
    caps.emit("deliveryNotices", deliveryNotices);
    deliveryNotices = [];
  } else {
    caps.emit("deliveryNotices", console.log("no new deliveries today"));
  };

  client.on("vendorRequest", (package) => {
    packageRequests.push(package);
    // caps.emit("vendorRequest", packageRequests);
    // packageRequests = [];
    // console.log(packageRequests);
  });
  client.on("sendRequests", () => {
    caps.emit("vendorRequests", packageRequests);
  })
  client.on("packagePickedUp", (package, driver) => {
    caps.emit("pickUpNotification", package, driver);
  })
  client.on("goDeliver", (package, driver) => {
    caps.emit("goDeliver", package, driver, console.log("Confirmation sent to parcel service"));
  })
  client.on("packageDelivered", (package) => {
    caps.emit("deliveryConfimation", package, console.log("Confirmation to Vendor"));
  })
});

setInterval(() => {
  console.log("Generating a Customer");
  caps.emit("requestMade", console.log("making request"));
}, 8000);
