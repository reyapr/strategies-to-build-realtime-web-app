
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require("mongodb");
const http = require('http');

const shortPolling = require('./app/notif/short_polling/controller')
const longPolling = require('./app/notif/long_polling/controller')
const sse = require('./app/notif/sse/controller')
const myWs = require('./app/notif/websocket/controller')

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

require('dotenv').config()

// const io = new Server(server);
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const database = client.db('realtime-web-app');
const notif = database.collection('notif');

app.post('/short-polling/notif', shortPolling.createNotif(notif));
app.get('/short-polling/notif', shortPolling.getNotif(notif));
app.get('/long-polling/notif', longPolling.getNotif(notif));
app.get('/sse/notif', sse.getNotif(notif))
app.post('/sse/notif', sse.createNotif(notif))

io.on('connection', (socket) => {
  console.log('client is connected')
  myWs.notifSync(notif, socket, io)
})

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`service listening at http://localhost:${PORT}`)
})

