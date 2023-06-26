import { useState } from "react";
import { PackingItem } from "./PackingItem";
import { Item } from "./models";

export type Props = {
  items: Item[];
  onDeleteItem: (id: number) => void;
  onUpdateItem: (id: number) => void;
  onClearList: () => void;
};
export function PackingList({
  items,
  onDeleteItem,
  onUpdateItem,
  onClearList,
}: Props) {
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
