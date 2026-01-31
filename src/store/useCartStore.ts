import { SanityImage } from "@/types/sanity";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  coverImage: SanityImage;
  discImage: SanityImage;
  quantity: number;
  slug: string;
}

interface CartStore {
  cartItems: CartItem[];
  isDrawerOpen: boolean;
  totalPrice: number;
  shippingCost: number;
  // Actions
  toggleDrawer: (open: boolean) => void;
  addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  setShippingCost: (cost: number) => void;
  calculateTotal: (items: CartItem[], shipping?: number) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      isDrawerOpen: false,
      totalPrice: 0,
      shippingCost: 0,

      toggleDrawer: (open) => set({ isDrawerOpen: open }),
      setShippingCost: (cost) => {
        set((state) => ({
          shippingCost: cost,
          totalPrice: get().calculateTotal(state.cartItems, cost),
        }));
      },
      calculateTotal: (items, shipping = get().shippingCost) => {
        const subtotal = items.reduce(
          (acc, item) => acc + Number(item.price) * item.quantity,
          0,
        );
        return subtotal + shipping;
      },
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existing = state.cartItems.find(
            (item) => item.id === product.id,
          );
          let newItems;

          if (existing) {
            newItems = state.cartItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            );
          } else {
            newItems = [...state.cartItems, { ...product, quantity }];
          }

          return {
            cartItems: newItems,
            totalPrice: get().calculateTotal(newItems),
            isDrawerOpen: true,
          };
        }),

      removeFromCart: (id) =>
        set((state) => {
          const newItems = state.cartItems.filter((item) => item.id !== id);
          return {
            cartItems: newItems,
            totalPrice: get().calculateTotal(newItems),
          };
        }),

      updateQuantity: (id, delta) =>
        set((state) => {
          const newItems = state.cartItems.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity + delta) }
              : item,
          );
          return {
            cartItems: newItems,
            totalPrice: get().calculateTotal(newItems),
          };
        }),

      clearCart: () => set({ cartItems: [], totalPrice: 0 }),
      getTotalPrice: () => {
        const { cartItems } = get();
        return cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cartItems: state.cartItems }),
    },
  ),
);
