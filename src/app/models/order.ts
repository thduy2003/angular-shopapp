import { OrderDetail } from './order-detail';
import { Product } from './product';

export interface Order {
  id: number;
  user_id: number;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  note: string;
  order_date: Date;
  payment_method: string;
  shipping_date: Date;
  shipping_method: string;
  status: string;
  total_money: number;
  order_details: OrderDetail[]
}
