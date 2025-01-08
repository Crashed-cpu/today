import { create } from 'zustand';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
  size: string;
}

interface WishlistItem extends Product {
  size: string;
}

interface UserState {
  isAuthenticated: boolean;
  user: {
    email: string;
    name: string;
  } | null;
}

interface Store {
  cart: CartItem[];
  wishlist: WishlistItem[];
  user: UserState;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  login: (email: string, name: string) => void;
  logout: () => void;
  clearCart: () => void;
}

export const useStore = create<Store>((set) => ({
  cart: [],
  wishlist: [],
  user: {
    isAuthenticated: false,
    user: null,
  },
  addToCart: (product, size) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.id === product.id && item.size === size
      );
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1, size }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),
  toggleWishlist: (product) =>
    set((state) => {
      const exists = state.wishlist.find((item) => item.id === product.id);
      if (exists) {
        return {
          wishlist: state.wishlist.filter((item) => item.id !== product.id),
        };
      }
      return { wishlist: [...state.wishlist, { ...product, size: 'defaultSize' }] };
    }),
  login: (email, name) =>
    set({
      user: {
        isAuthenticated: true,
        user: { email, name },
      },
    }),
  logout: () =>
    set({
      user: {
        isAuthenticated: false,
        user: null,
      },
    }),
  clearCart: () => set({ cart: [] }),
}));