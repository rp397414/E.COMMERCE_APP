import { createSlice,type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../types';

const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) return [];
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load cart from local storage", err);
    return [];
  }
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;