import { useState, useEffect } from "react";
import AddItem from "./components/AddItem";
import ItemList from "./components/ItemList";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const getItems = async () => {
    const response = await fetch(`${API_URL}/items`);

    if (!response.ok) {
      console.error("Failed to fetch items");
      return;
    }

    const data = await response.json();
    setItems(data);
  };

  useEffect(() => {
    getItems();
  }, []);

  const addItem = async () => {
    if (!name.trim() || !quantity || Number(quantity) <= 0) {
      alert("Please enter a valid product name and quantity.");
      return;
    }

    const response = await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        quantity: Number(quantity),
      }),
    });

    if (!response.ok) {
      alert("Failed to add item.");
      return;
    }

    setName("");
    setQuantity("");

    getItems();
  };

  const deleteItem = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch(`${API_URL}/items/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Failed to delete item.");
      return;
    }

    getItems();
  };

  const updateItem = async (id, name, quantity, bought) => {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        quantity: Number(quantity),
        bought,
      }),
    });

    if (!response.ok) {
      alert("Failed to update item.");
      return;
    }

    getItems();
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Shopping List</h1>

      <AddItem
        name={name}
        quantity={quantity}
        setName={setName}
        setQuantity={setQuantity}
        addItem={addItem}
      />

      <hr />

      <input
        type="text"
        placeholder="Search item..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ItemList
        items={filteredItems}
        deleteItem={deleteItem}
        updateItem={updateItem}
      />
    </div>
  );
}

export default App;