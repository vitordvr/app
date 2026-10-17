export type CategoryId =
  "restaurants" | "market" | "pharmacy" | "drinks" | "shopping" | "pets";
export interface Category {
  id: CategoryId;
  name: string;
  subtitle: string;
  color: string;
}
export interface Restaurant {
  id: string;
  name: string;
  category: CategoryId;
  cuisine: string;
  rating: number;
  time: number;
  delivery: number;
  distance: string;
  image: string;
  color: string;
  initials: string;
  promo: boolean;
}
export interface Product {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  section: string;
}
export interface CartItem {
  key: string;
  productId: string;
  quantity: number;
  note: string;
}
export interface Coupon {
  code: string;
  discount: number;
  minimum: number;
  title: string;
}
export interface Order {
  id: string;
  restaurantId: string;
  items: { name: string; price: number; quantity: number; note: string }[];
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  status: number;
  createdAt: string;
  address: string;
  payment: string;
}
export interface Banner {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  color: string;
  image: string;
  filter: string;
}
