import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  likePost: false,
}


export const likePostIdSlice = createSlice(
  {
    name: 'likePost',
    initialState,
    reducers: {
      getLikePost: (state, aciton) => {
        state.likePost = aciton.payload
      }
    }
  }
)

export const { getLikePost } = likePostIdSlice.actions
export default likePostIdSlice.reducer
