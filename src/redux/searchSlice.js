import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  search: '',
}


export const searchSlice = createSlice(
  {
    name: 'search',
    initialState,
    reducers: {
      getSearch: (state, aciton) => {
        state.search = aciton.payload
      }
    }
  }
)

export const { getSearch } = searchSlice.actions
export default searchSlice.reducer