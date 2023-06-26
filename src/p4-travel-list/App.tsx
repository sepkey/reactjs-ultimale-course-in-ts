import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";
import { Item } from "./models";

export default function App() {
  const [items, setItems] = useState<Item[]>([]);

  function handleAddItems(item: Item) {
    setItems((items) => [...items, item]);
  }

  function handleDeletItem(id: number) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleUpdateItem(id: number) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const clearConfirm = window.confirm(
      "Are you sure you want to delete all items?"
    );
    clearConfirm && setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeletItem}
        onUpdateItem={handleUpdateItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
