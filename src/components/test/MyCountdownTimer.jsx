import { DisabledByDefaultOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";
import axios from "axios";
import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/cartSlice";
import { getSuccessfulAuction } from "../../redux/successfulAuctionSlice";
import { getTimeOver } from "../../redux/timeOverSice";
// import { getSuccessfulAuction } from "../../redux/successfulAuctionSlice";

function MyCountdownTimer({ time, postId }) {
  console.log("redering mycountdowntimer;::");
  const [expiryTime, setExpiryTime] = React.useState(time);
  const [countdownTime, setCountdownTime] = React.useState({
    countdownDays: "",
    countdownHours: "",
    countdownMinutes: "",
    countdownSeconds: "",
  });

  const [timeOver, setTimeOver] = useState(false);
  const dispatch = useDispatch();
  // const dispatch = useDispatch();

  // const highestPriceBid = useSelector(
  //   (state) => state.highestPriceBid.highestPriceBid
  // );

  const countdownTimer = () => {
    const timeInterval = setInterval(() => {
      const countdownDateTime = new Date(expiryTime).getTime();
      // console.log(highestPriceBid);
      const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime;
      console.log("hieu thoi gian :::", remainingDayTime);
      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(
        (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const totalMinutes = Math.floor(
        (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

      const runningCountdownTime = {
        countdownDays: totalDays,
        countdownHours: totalHours,
        countdownMinutes: totalMinutes,
        countdownSeconds: totalSeconds,
      };

      setCountdownTime(runningCountdownTime);

      // if (remainingDayTime < 0 && remainingDayTime > -3000) {
      //   if (
      //     localStorage["highest_bid_user"] === localStorage["userId"] &&
      //     localStorage["highest_bid_user"]
      //   ) {
      //     // dispatch(getSuccessfulAuction(true));
      //     // updatePriceEnd();
      //     // addToCart();
      //   } else {
      //     dispatch(getSuccessfulAuction(false));
      //   }

      //   setExpiryTime(false);
      //   // setTimeOver(true);
      //   console.log("het thoi gian");
      //   dispatch(getTimeOver(true));
      //   // return;
      // }

      if (remainingDayTime < 0) {
        dispatch(getTimeOver(true));
        setExpiryTime(false);
        clearInterval(timeInterval);
        setTimeOver(true);
        return;
      } else {
        dispatch(getTimeOver(false));
      }
    }, 1000);
  };

  // const addToCart = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       "/user/addPostToCart",
  //       {
  //         postId,
  //       },
  //       {
  //         headers: {
  //           Authorization: localStorage["access_token"],
  //         },
  //       }
  //     );
  //     console.log("data_handlebuy", data.data);
  //     if (data.data) {
  //       dispatch(getCart());
  //     } else {
  //     }
  //   } catch (error) {
  //     console.log("Err_handle_buy:::", error);
  //   }
  // };

  //  update price end for post bid
  // const updatePriceEnd = async () => {
  //   try {
  //     await axios.put(
  //       "/user/updatePriceEnd",
  //       {
  //         postId,
  //         priceEnd: localStorage["highest_bid_price"],
  //       },
  //       {
  //         headers: {
  //           Authorization: localStorage["access_token"],
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.log("err_updatePriceEnd:::", error);
  //   }
  // };

  React.useEffect(() => {
    countdownTimer();
  }, []);

  return (
    <div>
      {timeOver ? (
        <div>
          <p>Thời gian đấu giá kết thúc!</p>
        </div>
      ) : (
        <Stack direction="row">
          <p> {countdownTime.countdownDays} Ngày </p>
          <p> - {countdownTime.countdownHours} Giờ </p>
          <p> - {countdownTime.countdownMinutes} Phút </p>
          <p> - {countdownTime.countdownSeconds} Giây</p>
        </Stack>
      )}
    </div>
  );
}

export default MyCountdownTimer;
