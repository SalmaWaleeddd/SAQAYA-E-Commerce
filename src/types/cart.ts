export interface CartItem {
  productId: number;
  title: string;
  thumbnail: string;
  price: number;        
  quantity: number;
  totalPrice: number;   
}

export interface CartState {
  isOpen: boolean;
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
}

export const FREE_SHIPPING_THRESHOLD = 140;
export const SHIPPING_COST = 15;