const express = require("express");
const cors = require("cors");

const http = require('http');
const app = express();
app.use(cors());
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{cors :{
  origin:'*',
}});

io.on('connection', (socket) => {
    console.log(socket.id +' user connected');

    socket.on("mousedown", function(data){
      socket.broadcast.emit("md",data);
    })

    socket.on("mousemove", function(data){
      socket.broadcast.emit("mm",data);
    })
  });

app.get("/", function(req,res){
    res.send("<h1>Welcome</h1>");
});



let port = process.env.PORT || 3000
server.listen(port, () => {
  console.log('listening on *:3000');
});