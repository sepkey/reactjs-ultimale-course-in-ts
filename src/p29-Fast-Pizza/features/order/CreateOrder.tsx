import { useState } from "react";
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

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData() as Partial<ErrorsObject>;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>
      {/* <Form method="post" action="/order/new"> */}
      <Form method="post">
        <div>
          <label>First Name</label>
          <input className="input" type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input className="input" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors?.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input className="input" type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
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
  const data = Object.fromEntries(formData);

  const order: Partial<OrderType> = {
    ...data,
    priority: data.priority === "on",
    cart: JSON.parse(String(data.cart)),
    estimatedDelivery: new Date().toISOString(),
    position: "2.33230044",
    orderPrice: Math.floor(Math.random() * 91) + 10,
    priorityPrice: Math.floor(Math.random() * 91) + 5,
  };

  const errors: Partial<ErrorsObject> = {};
  if (!isValidPhone(order.phone!)) {
    errors.phone =
      "Please give us your phone number. We might need it to contact you.";
  }

  if (Object.keys(errors).length > 0) return errors;

  await createOrder(order);

  const orders = (await getOrders()) as Partial<OrderType>[];

  return redirect(`/order/${orders.at(-1)?.id}`);
}
export default CreateOrder;
