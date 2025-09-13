import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductSize } from '../data/products';

export interface CartItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: ProductSize) => void;
  updateQuantity: (productId: string, sizeLabel: string, quantity: number) => void;
  removeItem: (productId: string, sizeLabel: string) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product: Product, size: ProductSize) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id && item.size.label === size.label
          );
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id && item.size.label === size.label
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, { product, size, quantity: 1 }],
          };
        });
      },
      updateQuantity: (productId: string, sizeLabel: string, quantity: number) => {
        set((state) => ({
          items: quantity <= 0 
            ? state.items.filter(item => !(item.product.id === productId && item.size.label === sizeLabel))
            : state.items.map((item) =>
                item.product.id === productId && item.size.label === sizeLabel
                  ? { ...item, quantity }
                  : item
              ),
        }));
      },
      removeItem: (productId: string, sizeLabel: string) => {
        set((state) => ({
          items: state.items.filter(item => !(item.product.id === productId && item.size.label === sizeLabel)),
        }));
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.size.price * item.quantity), 0);
      },
      clearCart: () => {
        set({ items: [] });
      },
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);