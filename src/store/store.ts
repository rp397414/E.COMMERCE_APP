import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Helper function to save cart state to local storage
const saveCartToLocalStorage = (state: RootState) => {
  try {
    // We only want to save the cart items, not the fetched products
    const serializedState = JSON.stringify(state.cart.items);
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
    console.error("Could not save cart to local storage", err);
  }
};

// Listen for any state changes and save the cart to local storage
store.subscribe(() => {
  saveCartToLocalStorage(store.getState());
});