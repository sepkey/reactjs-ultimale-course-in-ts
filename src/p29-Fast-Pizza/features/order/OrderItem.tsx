import { Item } from "../../models/models";
import { formatCurrency } from "../../utils/helpers";

type Props = {
  item: Item;
  isLoadingIngredients?: boolean;
  ingredients?: string[];
};

function OrderItem({ item, ingredients, isLoadingIngredients }: Props) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {isLoadingIngredients ? "loading..." : ingredients?.join(", ")}
        </p>
      </div>
    </li>
  );
}

export default OrderItem;
