import { useState } from "react";

type Item = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Caps", quantity: 2, packed: true },
// ];

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

function Logo() {
  return <h1>🌴 Far Away 👒</h1>;
}

type FormProps = {
  onAddItems: (item: Item) => void;
};
function Form({ onAddItems }: FormProps) {
  //causing unneccessary re-render
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  //avoiding unneccessary re-render
  // const descriptionRef = useRef<HTMLInputElement>(null);
  // const quantityRef = useRef<HTMLSelectElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!description) return;
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    } as Item;

    // const newItem = {
    //   description: descriptionRef.current?.value,
    //   quantity: quantityRef.current?.value,
    //   packed: false,
    //   id: Date.now(),
    // };
    onAddItems(newItem);
    console.log(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(+e.target.value)}
        // ref={quantityRef}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        // ref={descriptionRef}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>add</button>
    </form>
  );
}

type PackingListProps = {
  items: Item[];
  onDeleteItem: (id: number) => void;
  onUpdateItem: (id: number) => void;
  onClearList: () => void;
};

function PackingList({
  items,
  onDeleteItem,
  onUpdateItem,
  onClearList,
}: PackingListProps) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems?.map((i) => (
          <PackingItem
            key={i.id}
            item={i}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>clear list</button>
      </div>
    </div>
  );
}

type PackingItemProps = {
  item: Item;
  onDeleteItem: (id: number) => void;
  onUpdateItem: (id: number) => void;
};

function PackingItem({ item, onDeleteItem, onUpdateItem }: PackingItemProps) {
  return (
    <li>
      <input
        checked={item.packed}
        type="checkbox"
        onChange={() => onUpdateItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

type StatsProps = {
  items: Item[];
};

function Stats({ items }: StatsProps) {
  if (!items.length)
    return (
      <p className="stats">Start adding some items to your packing list 🚀</p>
    );
  const total = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percenage = Math.round((packedItems / total) * 100);
  return (
    <footer className="stats">
      <em>
        {percenage === 100
          ? "You got everything! Ready to go!"
          : ` 🧰 You have ${total} items on your list, and you already packed ${total} (
        ${percenage}%)`}
      </em>
    </footer>
  );
}
