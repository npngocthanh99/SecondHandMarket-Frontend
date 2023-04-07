const { default: axios } = require("axios");

module.exports = {
  getListBidUser: async (postId, postAuctionId) => {
    try {
      const { data } = await axios.get(
        `/common/listBidPrice/postId/${postId}/postAuctionId/${postAuctionId}`
      );

      data.data.forEach((item) => {
        if (item.userId === localStorage["userId"]) {
          // setPriceUserBid(item.priceBid);
          // setBidOrderId(item.id);
          // setIsRemove(true);
        }
      });
    } catch (error) {
      console.log("error_getListPostUserBid:::", error);
    }
  }

}