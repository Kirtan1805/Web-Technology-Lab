import { useState } from "react";
import "./style.css";

function ItemList({ items, onRemove }) {
  if (items.length === 0) {
    return <p className="empty-state">No items available. Add your first item.</p>;
  }

  return (
    <ul className="item-list">
      {items.map((item) => (
        <li className="item-row row-inline" key={item.id}>
          <span>{item.name}</span>
          <button className="remove-btn" onClick={() => onRemove(item.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

function Ex2() {
  const [items, setItems] = useState([
    { id: 1, name: "Laptop" },
    { id: 2, name: "Mouse" },
  ]);
  const [newItem, setNewItem] = useState("");
  const [nextId, setNextId] = useState(3);
  const [inputError, setInputError] = useState("");

  const handleAddItem = (event) => {
    event.preventDefault();
    const trimmedItem = newItem.trim();
    if (!trimmedItem) {
      setInputError("Item name cannot be empty.");
      return;
    }
    setItems((prev) => [...prev, { id: nextId, name: trimmedItem }]);
    setNextId((prev) => prev + 1);
    setNewItem("");
    setInputError("");
  };

  const handleRemoveItem = (itemId) => setItems((prev) => prev.filter((item) => item.id !== itemId));

  return (
    <main className="page">
      <section className="form-card">
        <div className="form-header">
          <p className="badge">Exercise 2</p>
          <h1>Dynamic Item List</h1>
          <p className="subtitle">Add and remove items with keys</p>
        </div>
        <form onSubmit={handleAddItem} noValidate>
          <div className="form-group">
            <label htmlFor="itemName">Item Name</label>
            <input id="itemName" type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
            {inputError && <p className="error-text">{inputError}</p>}
          </div>
          <button type="submit" className="submit-btn">
            Add Item
          </button>
        </form>
        <ItemList items={items} onRemove={handleRemoveItem} />
      </section>
    </main>
  );
}

export default Ex2;

