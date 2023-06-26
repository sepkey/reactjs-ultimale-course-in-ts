import { Item } from "./models";

export type Props = {
  items: Item[];
};

export function Stats({ items }: Props) {
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
