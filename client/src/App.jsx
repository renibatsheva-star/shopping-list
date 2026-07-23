import { useState, useEffect } from "react";
import AddItem from "./components/AddItem";
import ItemList from "./components/ItemList";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const response = await fetch("http://localhost:5000/items");
    const data = await response.json();
    setItems(data);
  };

  useEffect(() => {
    getItems();
  }, []);

  const addItem = async () => {
    await fetch("http://localhost:5000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        quantity: Number(quantity),
      }),
    });

    setName("");
    setQuantity("");

    getItems();
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, {
      method: "DELETE",
    });

    getItems();
  };

  const updateItem = async (id, name, quantity) => {
    await fetch(`http://localhost:5000/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        quantity: Number(quantity),
      }),
    });

    getItems();
  };

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





      <ItemList
        items={items}
        deleteItem={deleteItem}
        updateItem={updateItem}
      />






    </div>
  );
}

export default App;