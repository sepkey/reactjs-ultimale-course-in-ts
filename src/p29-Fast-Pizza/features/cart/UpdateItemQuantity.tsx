import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  deccreaceItemQuantity,
  getCurrentQuantityById,
  increaceItemQuantity,
} from "./cartSlice";

type Props = {
  pizzaId: number;
};
export default function UpdateItemQuantity({ pizzaId }: Props) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Button
        type="round"
        onClick={() => dispatch(deccreaceItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaceItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}
