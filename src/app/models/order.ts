export interface Item {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  customerName: string;
  deliveryAddress: string;
  status: 'received' | 'preparing' | 'ready';
  items: Item[];
}