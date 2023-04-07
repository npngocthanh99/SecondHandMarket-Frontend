import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cart: false,
}


export const cartSlice = createSlice(
  {
    name: 'cart',
    initialState,
    reducers: {
      getCart: (state, aciton) => {
        state.cart = !state.cart
      }
    }
  }
)

export const { getCart } = cartSlice.actions
export default cartSlice.reducer