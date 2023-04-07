import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  highestPriceBid: 0,
}


export const highestPriceBidSlice = createSlice(
  {
    name: 'highestPriceBid',
    initialState,
    reducers: {
      getHighestPriceBid: (state, aciton) => {
        state.highestPriceBid = aciton.payload
      }
    }
  }
)

export const { getHighestPriceBid } = highestPriceBidSlice.actions
export default highestPriceBidSlice.reducer