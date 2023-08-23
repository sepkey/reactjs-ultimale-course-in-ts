import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { Item, OrderType } from "../../models/models";
import { createOrder, getOrders } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../models/rtk-types";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAddress } from "../user/userSlice";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const username = useSelector((state: RootState) => state.user.username);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const prioprityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + prioprityPrice;
  const formErrors = useActionData() as Partial<ErrorsObject>;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <button onClick={() => dispatch(fetchAddress())}>get pos</button>
      {/* <Form method="post" action="/order/new"> */}
      <Form method="post">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            defaultValue={username}
            className="input grow"
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />

            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors?.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center  gap-5 ">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority ? "true" : "false"}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
interface ErrorsObject {
  phone: string;
}
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    address: string;
    cart: string;
    customer: string;
    phone: string;
    priority: string;
  };

  const orderPrice = (JSON.parse(data.cart) as Item[]).reduce(
    (sum, cur) => sum + cur.totalPrice,
    0,
  );

  const order: Partial<OrderType> = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(String(data.cart)),
    estimatedDelivery: new Date().toISOString(),
    position: "2.33230044",
    orderPrice: orderPrice,
    priorityPrice: data.priority === "true" ? orderPrice * 0.2 : 0,
  };

  const errors: Partial<ErrorsObject> = {};
  if (!isValidPhone(order.phone!)) {
    errors.phone =
      "Please give us your phone number. We might need it to contact you.";
  }

  if (Object.keys(errors).length > 0) return errors;

  await createOrder(order);

  const orders = (await getOrders()) as Partial<OrderType>[];

  store.dispatch(clearCart());
  return redirect(`/order/${orders.at(-1)?.id}`);
}
export default CreateOrder;
