import { OrderType } from "../models/models";

const API_URL = "http://localhost:8000";

export async function getMenu() {
  const res = await fetch(`${API_URL}/food`);

  if (!res.ok) throw Error("Failed getting menu");

  const data = await res.json();
  return data;
}

export async function getOrder(id: string) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const data = await res.json();
  return data;
}

export async function getOrders() {
  const res = await fetch(`${API_URL}/order`);
  if (!res.ok) throw Error("Couldn't find orders ");

  const data = await res.json();
  return data;
}

export async function createOrder(newOrder: Partial<OrderType>) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(id: string, updateObj: Partial<OrderType>) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
//TODO: type any
