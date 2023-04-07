import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentBidPrice: false,
  bidOrderId: 0,
}


export const currentBidPriceSlice = createSlice(
  {
    name: 'currentBidPrice',
    initialState,
    reducers: {
      getCurrentBidPrice: (state, aciton) => {
        state.currentBidPrice = aciton.payload
      },
      getBidOrderId: (state, aciton) => {
        state.bidOrderId = aciton.payload
      },

    }
  }
)

export const { getCurrentBidPrice, getBidOrderId, } = currentBidPriceSlice.actions
export default currentBidPriceSlice.reducer