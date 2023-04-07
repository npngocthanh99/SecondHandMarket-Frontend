import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  pageUrl: '',
}


export const pageUrlSlice = createSlice(
  {
    name: 'pageUrl',
    initialState,
    reducers: {
      getPageUrl: (state, aciton) => {
        state.search = aciton.payload
      }
    }
  }
)

export const { getPageUrl } = pageUrlSlice.actions
export default pageUrlSlice.reducer