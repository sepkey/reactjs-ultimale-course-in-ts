import { Item } from "../../models/models";
import { formatCurrency } from "../../utils/helpers";

type Props = {
  item: Item;
  isLoadingIngredients: boolean;
  ingredients: string[];
};

function OrderItem({ item, isLoadingIngredients, ingredients }: Props) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
