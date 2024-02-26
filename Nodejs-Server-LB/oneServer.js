//Server without load balancing
const express = require("express");
const os = require("os");

const app = express();

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
