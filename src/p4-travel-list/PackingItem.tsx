import { Item } from "./models";

type Props = {
  item: Item;
  onDeleteItem: (id: number) => void;
  onUpdateItem: (id: number) => void;
};
export function PackingItem({ item, onDeleteItem, onUpdateItem }: Props) {
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
