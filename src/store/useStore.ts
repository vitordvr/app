import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartItem, Order } from "../types";
import {
  coupons,
  exampleOrders,
  products,
  restaurants,
  user,
} from "../data/mocks";

export function totals(cart: CartItem[], couponCode: string) {
  const subtotal =
    Math.round(
      cart.reduce(
        (sum, item) =>
          sum +
          (products.find((p) => p.id === item.productId)?.price || 0) *
            item.quantity,
        0,
      ) * 100,
    ) / 100;
  const restaurantId = products.find(
    (p) => p.id === cart[0]?.productId,
  )?.restaurantId;
  const delivery =
    restaurants.find((r) => r.id === restaurantId)?.delivery || 0;
  const coupon = coupons.find(
    (c) => c.code === couponCode && subtotal >= c.minimum,
  );
  const discount = Math.min(subtotal, coupon?.discount || 0);
  return {
    subtotal,
    delivery,
    discount,
    total: Math.round((subtotal + delivery - discount) * 100) / 100,
  };
}
interface State {
  cart: CartItem[];
  favorites: string[];
  history: string[];
  orders: Order[];
  coupon: string;
  address: string;
  complement: string;
  payment: string;
  notifications: boolean;
  toast: { message: string; error: boolean } | null;
  hydrated: boolean;
  notify: (message: string, error?: boolean) => void;
  add: (
    productId: string,
    quantity: number,
    note: string,
    replace?: boolean,
  ) => boolean;
  quantity: (key: string, quantity: number) => void;
  toggleFavorite: (id: string) => void;
  search: (query: string) => void;
  applyCoupon: (code: string) => boolean;
  placeOrder: () => string | null;
  advance: (id: string) => void;
  setAddress: (address: string, complement: string) => void;
}
export const useStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      favorites: [],
      history: [],
      orders: exampleOrders,
      coupon: "",
      address: user.address,
      complement: user.complement,
      payment: "Cartão de demonstração •••• 4242",
      notifications: true,
      toast: null,
      hydrated: false,
      notify: (message, error = false) => set({ toast: { message, error } }),
      add: (productId, quantity, note, replace = false) => {
        const product = products.find((p) => p.id === productId);
        if (!product || !Number.isInteger(quantity) || quantity < 1)
          return false;
        const old = get().cart;
        if (
          old.length &&
          products.find((p) => p.id === old[0].productId)?.restaurantId !==
            product.restaurantId &&
          !replace
        )
          return false;
        const cart = replace ? [] : [...old];
        const key = `${productId}:${note.trim()}`;
        const existing = cart.find((item) => item.key === key);
        if (existing)
          cart[cart.indexOf(existing)] = {
            ...existing,
            quantity: existing.quantity + quantity,
          };
        else cart.push({ key, productId, quantity, note: note.trim() });
        set({ cart, coupon: replace ? "" : get().coupon });
        get().notify("Pronto! Adicionado à sua sacola.");
        return true;
      },
      quantity: (key, quantity) =>
        set((state) => ({
          cart: state.cart
            .map((item) => (item.key === key ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0),
        })),
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),
      search: (query) => {
        if (query.trim())
          set((state) => ({
            history: [
              query.trim(),
              ...state.history.filter((q) => q !== query.trim()),
            ].slice(0, 8),
          }));
      },
      applyCoupon: (code) => {
        const coupon = coupons.find(
          (c) => c.code === code.trim().toUpperCase(),
        );
        if (!coupon) {
          get().notify("Esse cupom não foi encontrado.", true);
          return false;
        }
        if (totals(get().cart, "").subtotal < coupon.minimum) {
          get().notify(
            `Pedido mínimo de R$ ${coupon.minimum.toFixed(2).replace(".", ",")} para este cupom.`,
            true,
          );
          return false;
        }
        set({ coupon: coupon.code });
        get().notify("Cupom aplicado. Aproveite seu desconto!");
        return true;
      },
      placeOrder: () => {
        const state = get();
        if (!state.cart.length || !state.address.trim()) return null;
        const id = `FG${Date.now()}`;
        const order: Order = {
          id,
          restaurantId: products.find((p) => p.id === state.cart[0].productId)!
            .restaurantId,
          items: state.cart.map((item) => {
            const p = products.find((p) => p.id === item.productId)!;
            return {
              name: p.name,
              price: p.price,
              quantity: item.quantity,
              note: item.note,
            };
          }),
          ...totals(state.cart, state.coupon),
          status: 0,
          createdAt: new Date().toISOString(),
          address: `${state.address} · ${state.complement}`,
          payment: state.payment,
        };
        set({ orders: [order, ...state.orders], cart: [], coupon: "" });
        return id;
      },
      advance: (id) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status: Math.min(3, o.status + 1) } : o,
          ),
        })),
      setAddress: (address, complement) =>
        set({ address: address.trim(), complement: complement.trim() }),
    }),
    {
      name: "foodgo-v1",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({
        cart,
        favorites,
        history,
        orders,
        coupon,
        address,
        complement,
        payment,
        notifications,
      }) => ({
        cart,
        favorites,
        history,
        orders,
        coupon,
        address,
        complement,
        payment,
        notifications,
      }),
      onRehydrateStorage: () => (_state, error) => {
        useStore.setState({ hydrated: true });
        if (error)
          useStore
            .getState()
            .notify("Não foi possível restaurar os dados locais.", true);
      },
    },
  ),
);
