import { configureStore } from "@reduxjs/toolkit";
import categoryChildIdReducer from './categorySlice'
import postIdReducer from './postSlice'
import likePostReducer from './likePostSlice'
import searchReducer from './searchSlice'
import pagingReducer from './pagingSlice'
import cartReducer from './cartSlice'
import pageUrlReducer from './pageUrlSlice'
import timeOverReducer from './timeOverSice'
import successfulAuctionReducer from './successfulAuctionSlice'
import currentBidPriceReducer from './currentBidPriceSice'
import highestPriceBidReducer from './highestPriceBidSlice'





export default configureStore(
  {
    reducer: {
      postId: postIdReducer,
      categoryChildId: categoryChildIdReducer,
      likePost: likePostReducer,
      timeOver: timeOverReducer,
      search: searchReducer,
      paging: pagingReducer,
      cart: cartReducer,
      pageUrl: pageUrlReducer,
      successfulAuction: successfulAuctionReducer,
      currentBidPrice: currentBidPriceReducer,
      highestPriceBid: highestPriceBidReducer,
    }
  }
)




// import { configureStore } from "@reduxjs/toolkit"
// import productReducer from './productSlice'
// import categoryReducer from './categorySlice'
// import searchReducer from './searchSlice'
// import cartReducer from './cartSlice'
// import { postSlice, postIdSlice } from './postSlice';
// export default configureStore({
//   reducer: {

//     product: productReducer,
//     category: categoryReducer,
//     search: searchReducer,
//     cart: cartReducer

//   }
// })