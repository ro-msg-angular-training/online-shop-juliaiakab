interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  customer: string;
  products: OrderItem[];
}
