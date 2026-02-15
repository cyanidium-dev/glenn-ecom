import { SanityImage } from "@/types/sanity";
import { BasketItem } from "@/types/store";
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
  /** Set when drawer open is requested; header shows first, then confirmDrawerOpen opens basket */
  drawerOpenRequestedAt: number | null;
  totalPrice: number;
  shippingCost: number;
  // Actions
  toggleDrawer: (open: boolean) => void;
  confirmDrawerOpen: () => void;
  addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  setShippingCost: (cost: number) => void;
  calculateTotal: (items: CartItem[], shipping?: number) => number;
  syncCartWithSanity: (
    freshRecords: BasketItem[],
    freshShipping: number,
  ) => { hasPriceChanges: boolean; hasShippingChanges: boolean };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      isDrawerOpen: false,
      drawerOpenRequestedAt: null,
      totalPrice: 0,
      shippingCost: 0,

      toggleDrawer: (open) =>
        set(() =>
          open
            ? { drawerOpenRequestedAt: Date.now() }
            : { isDrawerOpen: false, drawerOpenRequestedAt: null },
        ),
      confirmDrawerOpen: () =>
        set({ isDrawerOpen: true, drawerOpenRequestedAt: null }),
      syncCartWithSanity: (freshRecords, freshShipping) => {
        const { cartItems, shippingCost, calculateTotal } = get();
        let hasPriceChanges = false;

        const updatedItems = cartItems.map((item) => {
          const fresh = freshRecords.find((r) => r._id === item.id);
          const freshPrice = fresh ? Number(fresh.priceCHF) : item.price;

          if (freshPrice !== item.price) {
            hasPriceChanges = true;
            return { ...item, price: freshPrice };
          }
          return item;
        });

        const hasShippingChanges = freshShipping !== shippingCost;

        if (hasPriceChanges || hasShippingChanges) {
          set({
            cartItems: updatedItems,
            shippingCost: freshShipping,
            totalPrice: calculateTotal(updatedItems, freshShipping),
          });
        }

        return { hasPriceChanges, hasShippingChanges };
      },
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
            drawerOpenRequestedAt: Date.now(),
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
