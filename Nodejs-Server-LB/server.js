//server with load balancing
const express = require("express");
const cluster = require("cluster");
const os = require("os");

const numCPUs = os.cpus().length;
console.log("File ran");
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  app.get("/test", (req, res) => {
    res.send("Hello World!");
  });

  const port = process.env.PORT || 3000;

  const server = app.listen(port, () => {
    console.log(`Worker ${process.pid} started. Listening on port ${port}`);
  });

  let connections = 0;
  server.on("connection", (socket) => {
    // console.log(`Worker ${process.pid} received a connection`);
    connections++;
    if (connections > numCPUs * 100) {
      console.log(`Too many connections (${connections}). Pausing socket.`);
      socket.pause();
      setTimeout(() => {
        console.log("Resuming socket.");
        socket.resume();
      }, 100);
    }
    socket.on("close", () => {
      connections--;
    });
  });
}
