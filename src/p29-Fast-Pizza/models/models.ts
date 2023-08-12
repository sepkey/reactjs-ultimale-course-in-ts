export interface Item {
  quantity: number;
  name: string;
  totalPrice: number;
  pizzaId: number;
  unitPrice: number;
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

export interface Pizza {
  id: string;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
}
