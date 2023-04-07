import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  paging: 1,
}


export const pagingSlice = createSlice(
  {
    name: 'paging',
    initialState,
    reducers: {
      getPaging: (state, aciton) => {
        state.paging = aciton.payload
      }
    }
  }
)

export const { getPaging } = pagingSlice.actions
export default pagingSlice.reducer