import { ActionFunctionArgs, Params, useFetcher } from "react-router-dom";
import { OrderType } from "../../models/models";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

type Props = { order: OrderType };
export default function UpdateOrder({ order }: Props) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export async function action({ params }: { params: Params<string> }) {
  const data = { priority: true };
  await updateOrder(params.orderId!, data);
  return null;
}
