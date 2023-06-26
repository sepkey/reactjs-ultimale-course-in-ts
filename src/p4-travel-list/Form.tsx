import { useState } from "react";
import { Item } from "./models";

type Props = {
  onAddItems: (item: Item) => void;
};

export function Form({ onAddItems }: Props) {
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

      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
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
