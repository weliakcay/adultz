/**
 * Sepet type tanımlamaları
 */

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  quantity: number;
  options?: {
    skinTone?: string;
    hair?: string;
    eyes?: string;
  };
};

export type ShippingInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  note?: string;
};

export type CartState = {
  items: CartItem[];
  shippingCost: number;
  total: number;
};

export type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getShippingCost: () => number;
  itemCount: number;
};
