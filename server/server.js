const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const items = [];

app.get("/", (req, res) => {
  res.send("Shopping List API is running!");
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const newItem = {
    id: Date.now(),
    name: req.body.name,
    quantity: req.body.quantity,
    bought: false
  };

  items.push(newItem);

  res.status(201).json(newItem);
});


app.put("/items/:id", (req, res) => {
  const id = Number(req.params.id);

  const item = items.find(item => item.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  item.name = req.body.name ?? item.name;
  item.quantity = req.body.quantity ?? item.quantity;
  item.bought = req.body.bought ?? item.bought;

  res.json(item);
});



app.delete("/items/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  items.splice(index, 1);

  res.json({ message: "Item deleted" });
});











console.log("PUT route loaded");







app.listen(5000, () => {
  console.log("Server is running on port 5000");
});