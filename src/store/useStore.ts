import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  description: string;
  specifications: Record<string, string>;
  rating: number;
  reviews: number;
  inStock: boolean;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Payment' | 'On Process' | 'On Delivery' | 'Delivered' | 'Rate' | 'cancelled';
  date: string;
  shippingAddress: Address;
  paymentMethod: string;
  paidAt?: string;
}

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;

  // User
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Wishlist
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (product, quantity = 1) => {
        const existingItem = get().cart.find(item => item.id === product.id);
        if (existingItem) {
          set({
            cart: get().cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            cart: [...get().cart, { ...product, quantity }]
          });
        }
      },
      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter(item => item.id !== productId)
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        });
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      getCartItemsCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },

      // User
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, cart: [], orders: [], wishlist: [] }),

      // Orders
      orders: [],
      addOrder: (order) => set({ orders: [order, ...get().orders] }),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Wishlist
      wishlist: [],
      addToWishlist: (productId) => {
        if (!get().wishlist.includes(productId)) {
          set({ wishlist: [...get().wishlist, productId] });
        }
      },
      removeFromWishlist: (productId) => {
        set({ wishlist: get().wishlist.filter(id => id !== productId) });
      },
      isInWishlist: (productId) => get().wishlist.includes(productId),
    }),
    {
      name: 'techstore-storage',
    }
  )
);