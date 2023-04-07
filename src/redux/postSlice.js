import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  postId: 0,
}


export const postIdSlice = createSlice(
  {
    name: 'postId',
    initialState,
    reducers: {
      getPostId: (state, aciton) => {
        state.postId = aciton.payload
      }
    }
  }
)

export const { getPostId } = postIdSlice.actions
export default postIdSlice.reducer