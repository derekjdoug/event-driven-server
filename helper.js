function sleep(amt) {
  return new Promise((resolve) => setTimeout(resolve, amt));
}

function convertTimestamp(timestamp) {
  options = {
    hour: 'numeric', minute: 'numeric',
    weekday: 'long', month: 'long', day: 'numeric',
    hour12: true,
  }
  let date = new Intl.DateTimeFormat('en-EN', options).format(timestamp);
  return date;
}

module.exports = {
  sleep,
  convertTimestamp,
}
