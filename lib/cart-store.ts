'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  rarity: string;
  slug: string;
}

export interface CartItemType {
  product: CartProduct;
  quantity: number;
}

interface CartState {
  items: CartItemType[];
  isOpen: boolean;
  addItem: (product: CartProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product: CartProduct, quantity: number = 1) => {
        set((state) => {
          const existing = state.items?.find((item: CartItemType) => item?.product?.id === product?.id);
          if (existing) {
            return {
              items: (state.items ?? []).map((item: CartItemType) =>
                item?.product?.id === product?.id
                  ? { ...item, quantity: (item?.quantity ?? 0) + quantity }
                  : item
              ),
            };
          }
          return { items: [...(state.items ?? []), { product, quantity }] };
        });
      },
      removeItem: (productId: string) => {
        set((state) => ({
          items: (state.items ?? []).filter((item: CartItemType) => item?.product?.id !== productId),
        }));
      },
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: (state.items ?? []).map((item: CartItemType) =>
            item?.product?.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setCartOpen: (open: boolean) => set({ isOpen: open }),
      totalItems: () => (get().items ?? []).reduce((sum: number, item: CartItemType) => sum + (item?.quantity ?? 0), 0),
      totalPrice: () =>
        (get().items ?? []).reduce(
          (sum: number, item: CartItemType) => sum + (item?.product?.price ?? 0) * (item?.quantity ?? 0),
          0
        ),
    }),
    { name: 'hmx-cart' }
  )
);
