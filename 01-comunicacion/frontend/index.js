const express = require("express");
const cors = require("cors");
const http = require("node:http");

const app = express();

app.use(cors());
app.use(express.static("./public"));

app.get("/healthcheck", (req, res) => res.send("ok"));

app.get("/api/config", (req, res) => {
  res.json({
    backendUrl: "http://localhost:3001/api/products",
  });
});

app.use("**", (req, res) => res.status(404).send("Path not found"));

const server = http.createServer(app);
server.listen(3000, () => console.log(`Server is running on port 3000`));
