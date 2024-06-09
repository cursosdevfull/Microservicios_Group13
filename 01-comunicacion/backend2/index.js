const express = require("express");
const cors = require("cors");
const http = require("node:http");

const app = express();

app.use(cors());

app.get("/healthcheck", (req, res) => res.send("ok"));

app.get("/api/products", async (req, res) => {
  const products = [
    {
      id: 1,
      category: "Category1",
      product: "Product1",
      price: 10.1,
      stock: 20,
    },
    {
      id: 2,
      category: "Category1",
      product: "Product2",
      price: 20.2,
      stock: 30,
    },
    {
      id: 3,
      category: "Category1",
      product: "Product3",
      price: 18.8,
      stock: 70,
    },
    {
      id: 4,
      category: "Category1",
      product: "Product4",
      price: 45.3,
      stock: 20,
    },
    { id: 5, category: "Category1", product: "Product5", price: 56, stock: 56 },
  ];

  res.json(products);
});

app.use("**", (req, res) => res.status(404).send("Path not found"));

const server = http.createServer(app);
server.listen(3002, () => console.log(`Server is running on port 3002`));
