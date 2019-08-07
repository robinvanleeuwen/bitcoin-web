const WebSocket = require('ws')
const url = 'https://localhost/kraken/'
const connection = new WebSocket(url)

connection.onopen = () => {
  console.log("I am open!!")
  payload = {
    event: "subscribe",
    pair: ["XBT/EUR"],
    subscription: {
      name: "ticker"
    }
  }

  connection.send(JSON.stringify(payload));

}

connection.onerror = (error) => {
  console.log("Yey i've hit an error!");
  console.log(error)
}

connection.onmessage = (msg) => {
  console.log(msg.data)
}


// const WSClient = require('websocket').w3cwebsocket;

// wsClient = new WSClient("http://127.0.0.1/kraken", "kraken-proxy")

// wsClient.onmessage = (msg) => {
//   data = JSON.parse(msg.data);
//   console.log(data)
// }

// wsClient.onopen = () => {
//   console.log("Connected...");
//   // console.log("subscribing to 'ohlc-1'");
//   // wsClient.send("ohlc-1");
//   //console.log("subscribing to 'ticker'");
//   //wsClient.send("ticker");
// }

