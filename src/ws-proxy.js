const WSClient = require('websocket').w3cwebsocket;
const WSServer = require('websocket').server;
const http = require('http')

var server = http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  console.log((new Date()) + " request for " + request.url);
});

server.listen(8080, () => {
  console.log("Server listening on :8080");
})

wsServer = new WSServer({
  httpServer: server,
  autoAcceptConnections: false
});

wsServer.on("request", (request) => {
  
  var connection = request.accept('kraken-proxy', request.origin);
  console.log(request);
  console.log("-------------------------------------------");
  console.log(connection);
  console.log("-------------------------------------------");


  connection.on('message', function(message) {
    console.log("Received: ", message);
    if (message.type === 'utf8' && message.utf8Data == "ticker") {
      serverResponse.registerTickerListener(function(val){
          connection.send(JSON.stringify(serverResponse.ticker));
      })
      connection.send(JSON.stringify(serverResponse.ticker));
    }

    if (message.type === 'utf8' && message.utf8Data == "ohlc-1") {
      serverResponse.registerOhlcListener(function(val){
        console.log(serverResponse.ohlc)   
        connection.send(JSON.stringify(serverResponse.ohlc));
      })
    }

  });
});

var serverResponse = {

  //-----------------------------------------------------------
  tickerInternal: [],
  tickerListener: function(val) {},
  set ticker(val) {
    console.log("Updating Ticker: ", val[1].c[0]);
    this.tickerInternal = val;
    this.tickerListener(val);
  },
  get ticker() {
    console.log("Getting ticker");
    return this.tickerInternal;
  },
  registerTickerListener: function(listener) {
    console.log("Registering Ticker Listener");
    this.tickerListener = listener;
  },
  //-----------------------------------------------------------
  ohlcInternal: [],
  ohlcListener: (val) => {},
  set ohlc(val) {
    console.log("Updating OHLC");
    console.log(val);
    this.ohlcInternal = val;
    this.ohlcListener(val);
  },
  get ohlc() {
    return this.ohlcInternal;
  },
  registerOhlcListener: function (listener){
    this.ohlcListener = listener;
  }
  //-----------------------------------------------------------

};

wsClient = new WSClient("wss://ws.kraken.com/")
console.log("Connecting");

wsClient.onmessage = (msg) => {

  var data = JSON.parse(msg.data);
  
  if (data[2] != undefined) {
    switch(data[2]){
      case "ticker":
        serverResponse.ticker = data;
        break;
      case "ohlc-1":
        serverResponse.ohlc = data
        break;
      default:
        console.log(data);
        break;
  
    }
  }
  
  if (data.event == "systemStatus") {
    console.log("status: ", data.status);
    console.log("version: ", data.version);

    payload = {
      event: "subscribe",
      pair: ["XBT/EUR"],
      subscription: {
        name: "ticker"
      }
    }

    wsClient.send(JSON.stringify(payload));

    payload = {
      event: "subscribe",
      pair: ["XBT/EUR"],
      subscription: {
        name: "ohlc",
        interval: 1
      }
    }

    wsClient.send(JSON.stringify(payload));

  }

}
