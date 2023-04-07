import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  successfulAuction: false,
}


export const successfulAuctionSlice = createSlice(
  {
    name: 'successfulAuction',
    initialState,
    reducers: {
      getSuccessfulAuction: (state, aciton) => {
        state.successfulAuction = aciton.payload
      }
    }
  }
)

export const { getSuccessfulAuction } = successfulAuctionSlice.actions
export default successfulAuctionSlice.reducer