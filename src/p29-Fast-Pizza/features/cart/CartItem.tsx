import { Item } from "../../models/models";
import { formatCurrency } from "../../utils/helpers";

type Props = {
  item: Item;
};

function CartItem({ item }: Props) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li>
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default CartItem;
