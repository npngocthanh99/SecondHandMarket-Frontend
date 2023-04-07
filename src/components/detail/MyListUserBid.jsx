import { Paper } from "@material-ui/core";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  getBidOrderId,
  getCurrentBidPrice,
} from "../../redux/currentBidPriceSice";
import { getHighestPriceBid } from "../../redux/highestPriceBidSlice";
import { formatCash } from "../../helps/common";
const socket = io();

function MyListUserBid({ postId, postAuctionId }) {
  const [listBidUser, setListBidUser] = useState([]);
  const dispatch = useDispatch();

  const getHighestBidder = async () => {
    try {
      const { data } = await axios.get(
        `/user/highestBidder/postId/${postId}}/postAuctionId/${postAuctionId}`,
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );
      localStorage.setItem("highest_bid_user", data.data.userId);
      if (data.data.priceBid !== 0) {
        dispatch(getHighestPriceBid(data.data.priceBid));
        // localStorage.setItem("highest_bid_price", data.data.priceBid);
      }

      // return data.data.priceBid;
    } catch (error) {
      console.log("error_getHighestBidder:::", error);
    }
  };

  const getListBidUser = async () => {
    try {
      const { data } = await axios.get(
        `/common/listBidPrice/postId/${postId}/postAuctionId/${postAuctionId}`
      );

      data.data.forEach((item) => {
        if (item.userId === localStorage["userId"]) {
          // setPriceUserBid(item.priceBid);
          // setBidOrderId(item.id);
          // setIsRemove(true);
          dispatch(getCurrentBidPrice(item.priceBid));
          dispatch(getBidOrderId(item.id));
          // dispatch(getHighestBidder(item.userId));
        }
      });
      setListBidUser(data.data);
    } catch (error) {
      console.log("error_getListPostUserBid:::", error);
    }
  };

  useEffect(() => {
    getListBidUser();
    getHighestBidder();
  }, []);

  useEffect(() => {
    socket.on("userBid", (bid) => {
      console.log("clicked bid button", bid);
      getListBidUser();
      getHighestBidder();
    });
    return () => {
      socket.off("userBid");
    };
  }, []);

  return (
    <Stack spacing={2}>
      <Stack direction="column" spacing={1}>
        {listBidUser.map((item) => {
          return (
            <Paper
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: 4,
                justifyContent: "space-between",
              }}
            >
              <img
                src={
                  item.User.avatarImg ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                }
                alt=""
                width={30}
                height={30}
                style={{ borderRadius: "50%" }}
              />
              <p style={{ marginLeft: 16 }}>
                {formatCash(String(item.priceBid))} đ
              </p>
              <ClearIcon style={{ fill: "white" }}></ClearIcon>
            </Paper>
          );
        })}
      </Stack>
    </Stack>
  );
}

export default MyListUserBid;
