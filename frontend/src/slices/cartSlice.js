import { createSlice } from '@reduxjs/toolkit'; // we use createSlice when we are not using async functions, otherwise we use createApi from redux toolkit

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      // check if item exists in cart
      const existItem = state.cartItems.find(
        (currItem) => currItem._id === item._id
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((currItem) =>
          currItem._id === existItem._id ? item : currItem
        );
      } else {
        state.cartItems = [...state.cartItems, item]; // we do not use .push() because state is immutable. So we use the spread operator to create a new array and add the new item to it
      }

      //sum Price and quantity of items in cart
      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      );
      // Shipping $$$ if order over $50 free shipping, else 7
      addDecimals((state.shippingPrice = state.itemsPrice > 50 ? 0 : 7));

      // Tax is 6% of itemsPrice
      state.taxPrice = addDecimals(
        Number((0.06 * state.itemsPrice).toFixed(2))
      );

      // Total $$$
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItemToCart } = cartSlice.actions;
export default cartSlice.reducer;
