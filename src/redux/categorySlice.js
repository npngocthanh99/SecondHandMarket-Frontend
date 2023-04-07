import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryChildId: 0,
}


export const categoryChildIdSlice = createSlice(
  {
    name: 'categoryChildId',
    initialState,
    reducers: {
      getCategoryChildId: (state, aciton) => {
        state.categoryChildId = aciton.payload
      }
    }
  }
)

export const { getCategoryChildId } = categoryChildIdSlice.actions
export default categoryChildIdSlice.reducer