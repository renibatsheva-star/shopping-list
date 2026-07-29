const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const logStream = fs.createWriteStream(
  path.join(__dirname, "server.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: logStream }));

function writeLog(message) {
  const log = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(path.join(__dirname, "server.log"), log);
}

const filePath =
  process.env.ITEMS_FILE || path.join(__dirname, "items.json");

function getItems() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function saveItems(items) {
  fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
}

// Shared validation function
function validateItem(name, quantity) {
  if (typeof name !== "string" || !name.trim()) {
    return "Product name is required.";
  }

  const parsedQuantity = Number(quantity);

  if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
    return "Quantity must be greater than 0.";
  }

  return null;
}

app.get("/", (req, res) => {
  res.send("Shopping List API is running!");
});

app.get("/items", (req, res) => {
  const items = getItems();
  writeLog(`GET /items - Returned ${items.length} items`);
  res.json(items);
});

app.post("/items", (req, res) => {
  const items = getItems();

  const { name, quantity } = req.body;

  const error = validateItem(name, quantity);

  if (error) {
    writeLog(`POST /items - Validation failed: ${error}`);
    return res.status(400).json({ message: error });
  }

  const newItem = {
    id: Date.now(),
    name: name.trim(),
    quantity: Number(quantity),
    bought: false,
  };

  items.unshift(newItem);

  saveItems(items);

  writeLog(`POST /items - Item added: ${newItem.name}`);

  res.status(201).json(newItem);
});

app.put("/items/:id", (req, res) => {
  const items = getItems();

  const id = Number(req.params.id);

  const item = items.find((item) => item.id === id);

  if (!item) {
    writeLog(`PUT /items/${id} - Item not found`);
    return res.status(404).json({ message: "Item not found" });
  }

  const { name, quantity, bought } = req.body;

  const error = validateItem(name, quantity);

  if (error) {
    writeLog(`PUT /items/${id} - Validation failed: ${error}`);
    return res.status(400).json({ message: error });
  }

  item.name = name.trim();
  item.quantity = Number(quantity);
  item.bought = bought ?? item.bought;

  saveItems(items);

  writeLog(`PUT /items/${id} - Item updated`);

  res.json(item);
});

app.delete("/items/:id", (req, res) => {
  const items = getItems();

  const id = Number(req.params.id);

  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    writeLog(`DELETE /items/${id} - Item not found`);
    return res.status(404).json({ message: "Item not found" });
  }

  items.splice(index, 1);

  saveItems(items);

  writeLog(`DELETE /items/${id} - Item deleted`);

  res.json({ message: "Item deleted" });
});

module.exports = app;