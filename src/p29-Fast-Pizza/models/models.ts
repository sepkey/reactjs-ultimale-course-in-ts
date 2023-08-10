export interface Item {
  quantity: number;
  name: string;
  totalPrice: number;
  pizzaId: number;
  unitPrice: number;
}

export interface OrderType {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: Item[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
}

export interface Pizza {
  id: string;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
}
