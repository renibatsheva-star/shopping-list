function AddItem({
  name,
  quantity,
  setName,
  setQuantity,
  addItem,
}) {
  return (
    <div>
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <br />
      <br />

      <button className="add-btn" onClick={addItem}>
  Add
</button>
    </div>
  );
}

export default AddItem;