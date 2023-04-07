import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  timeOver: false,
}


export const timeOverSlice = createSlice(
  {
    name: 'timeOver',
    initialState,
    reducers: {
      getTimeOver: (state, aciton) => {
        state.timeOver = aciton.payload
      }
    }
  }
)

export const { getTimeOver } = timeOverSlice.actions
export default timeOverSlice.reducer