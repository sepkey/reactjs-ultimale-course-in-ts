export interface Item {
  pizzaId: number;
  name: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface Pizza {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
}

export interface OrderType {
  estimatedDelivery: string;
  position: string;
  orderPrice: number;
  priorityPrice: number;
  priority: boolean;
  phone: string;
  customer: string;
  id: string;
  cart: Item[];
  address: string;
}
