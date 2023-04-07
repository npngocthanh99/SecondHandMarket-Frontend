import axios from "axios";

// module.exports = {
//   updatePriceEnd: async (postId, priceEnd) => {
//     try {
//       await axios.put(
//         "/user/updatePriceEnd",
//         {
//           postId,
//           priceEnd: localStorage["highest_bid_price"],
//         },
//         {
//           headers: {
//             Authorization: localStorage["access_token"],
//           },
//         }
//       );
//     } catch (error) {
//       console.log("err_updatePriceEnd:::", error);
//     }
//   },
// }

export const getPostsBidding = async () => {
  try {
    const { data } = await axios.get('/common/posts/type/BIDDING/activeId/1');
    console.log('getPostBidding:::', data.data)
    return data.data;
  } catch (error) {
    console.log('error_getPostsBidding:::', error);
  }
}

