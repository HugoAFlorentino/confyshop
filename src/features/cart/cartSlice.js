import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage,
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find((i) => i.cartId === product.cartId);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.success('Item added to cart');
    },

    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState;
    },

    removeItem: (state, action) => {
      const { cartId } = action.payload;
      const product = state.cartItems.find((i) => i.cartId === cartId);

      if (!product) {
        toast.error('Item not found in the cart');
        return;
      }

      state.cartItems = state.cartItems.filter((i) => i.cartId !== cartId);
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.error('Item successfully removed from the cart');
    },

    editItem: (state, action) => {
      const { cartId, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartId === cartId);

      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);

      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);

      toast.success('Cart Updated');
    },

    // NEW REDUCER TO REUSE IN OTHER METHODS USING caseReducers
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;

      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
