import { CartItem } from './cartItemInterface';

export interface Order {
  customer: string;
  products: CartItem[];
}
