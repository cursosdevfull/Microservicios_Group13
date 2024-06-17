const express = require("express");
const cors = require("cors");
const http = require("node:http");

const app = express();

app.use(cors());
app.use(express.static("./public"));

app.get("/healthcheck", (req, res) => res.send("ok"));

app.get("/api/config", (req, res) => {
  res.json({
    backendUrl:
      process.env.SERVICE_BACKEND1 || "http://localhost:3001/api/products",
  });
});

app.use("**", (req, res) => res.status(404).send("Path not found"));

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server is running on port ${port}`));
