import Item from "./Item";

function ItemList({ items, deleteItem, updateItem }) {
    if (items.length === 0) {
  return <p>No items yet.</p>;
}
  return (
    <>
      <h2>Products</h2>

      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        ))}
      </ul>
    </>
  );
}

export default ItemList;