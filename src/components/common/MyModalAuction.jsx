import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimeOver } from "../../redux/timeOverSice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const socket = io();

function MyModalAuction() {
  const navigate = useNavigate();
  // const successfulAuction = useSelector(
  //   (state) => state.successfulAuction.successfulAuction
  // );
  const dispatch = useDispatch();
  const [isHighestBidder, setIsHighestBidder] = useState(false);
  const [open, setOpen] = useState(false);

  // const _timeOver = useSelector((state) => state.timeOver.timeOver);

  // const handleOpen = () => setOpen(true);

  const handleClose = () => {
    dispatch(getTimeOver(false));
  };

  useState(() => {
    // setOpen(isOpen);
    socket.on("test", (data) => {
      console.log("data from socket:::", data);
      if (!data || !localStorage["userId"]) {
        return;
      }
      if (data.highestBidder === localStorage["userId"]) {
        setOpen(true);
        setIsHighestBidder(true);
        return;
      }
      if (
        data.otherBidders.some((item) => item.userId === localStorage["userId"])
      ) {
        setOpen(true);
        setIsHighestBidder(false);
        console.log("show modal");

        return;
      }
    });
    return () => {
      socket.off("test");
    };
  }, [open]);

  return (
    <div>
      {isHighestBidder ? (
        <Modal
          open={open}
          onClose={() => {
            handleClose();
            setOpen(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Thời gian đấu giá kết thúc!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Chúc mừng bạn đã đấu giá thành công sản phẩm, mới bạn đến giỏ hàng
              để thanh toán.
            </Typography>
            <Stack
              direction="row"
              paddingTop={4}
              justifyContent="center"
              spacing={2}
            >
              <Button
                size="small"
                style={{
                  backgroundColor: "#7b35ba",
                  color: "white",
                  textTransform: "none",
                }}
                onClick={() => {
                  navigate("/cart");
                  setOpen(false);
                }}
              >
                <ShoppingCartCheckoutIcon />
                Đi vào giỏ hàng
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                style={{
                  color: "#7b35ba",
                  textTransform: "none",
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <ClearIcon />
                thoát
              </Button>
            </Stack>
          </Box>
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={() => {
            dispatch(getTimeOver(true));
            setOpen(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Thời gian đấu giá kết thúc!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Đấu giá thất bại!
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 24,
              }}
            >
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                style={{
                  color: "#7b35ba",
                  textTransform: "none",
                }}
                // marginTop={8}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <ClearIcon />
                Thoát
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default MyModalAuction;
