import { useState } from "react";

type Item = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

const initialItems: Item[] = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Caps", quantity: 2, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👒</h1>;
}

function Form() {
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
    };

    // const newItem = {
    //   description: descriptionRef.current?.value,
    //   quantity: quantityRef.current?.value,
    //   packed: false,
    //   id: Date.now(),
    // };

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
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((i) => (
          <PackingItem key={i.id} item={i} />
        ))}
      </ul>
    </div>
  );
}

function PackingItem({ item }: { item: Item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em> 🧰 You have X items on your list, and you already packed x (x%)</em>{" "}
    </footer>
  );
}
