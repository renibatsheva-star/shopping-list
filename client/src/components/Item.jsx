import { useState } from "react";

function Item({ item, deleteItem, updateItem }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);

  const save = () => {
  updateItem(item.id, name, quantity, item.bought);
    setEditing(false);
  };


  const toggleBought = () => {
  updateItem(
    item.id,
    item.name,
    item.quantity,
    !item.bought
  );
};






  if (editing) {
    return (
      <li>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button className="add-btn" onClick={save}>
          💾 Save
        </button>
      </li>
    );
  }

  return (
    <li>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        
        <div>
  <strong
    style={{
      textDecoration: item.bought ? "line-through" : "none",
      color: item.bought ? "gray" : "black",
    }}
  >
    🛒 {item.name}
  </strong>

  <br />

  Quantity: {item.quantity}
</div>














        <div>
          <button
            className="edit-btn"
            onClick={() => setEditing(true)}
          >
            ✏️ Edit
          </button>


          <button
  className="add-btn"
  onClick={toggleBought}
>
{item.bought ? "✅ Bought" : "☐ Mark as Bought"}</button>


          <button
            className="delete-btn"
            onClick={() => deleteItem(item.id)}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default Item;