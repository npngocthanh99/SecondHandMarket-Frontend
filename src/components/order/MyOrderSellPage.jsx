import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@material-ui/core";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import MyModalBill from "./MyModalBill";
import { MenuItem, Tab, Tabs, TextField } from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getUserInfoByUser } from "../../API/user_api";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
};

const listShipping = [
  {
    id: 1,
    name: "Viettel Post",
  },
  {
    id: 2,
    name: "Giao hàng tiết kiệm",
  },
  {
    id: 3,
    name: "J&T Express",
  },
  {
    id: 4,
    name: "Giao hàng nhanh",
  },
];

function MyOrderSellPage() {
  const [value, setValue] = React.useState("CONFIRM");
  const [listPost, setListPost] = useState([]);
  const [tapButton, setTapButton] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [address, setAddress] = useState("");
  const [shipping, setShipping] = useState("");
  const [postId, setPostId] = useState("");

  const [valueTime, setValueTime] = useState(Date.now());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const getListOrderBuyPost = async () => {
    try {
      const { data } = await axios.get(`/user/orderBuyPost/${value}`, {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      console.log("listPost:::", data.data);
      setListPost(data.data);
    } catch (error) {
      console.log("err_getListOrderBuyPost:::", error);
    }
  };

  const handleChangeStatusOrderPost = async (id, status) => {
    try {
      const { data } = await axios.put(
        "/user/updateConfirmOrderPost",
        {
          id,
          status,
        },
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );
      // setTapButton(data.data);
      getListOrderBuyPost();
    } catch (error) {
      console.log("err_handleConfirm:::", error);
    }
  };

  const hanlePending = async () => {
    try {
      setOpenModal(true);
    } catch (error) {}
  };

  const getUserInfo = async () => {
    try {
      const data = await getUserInfoByUser();
      setAddress(data.address);
    } catch (error) {}
  };

  useEffect(() => {
    getListOrderBuyPost();
  }, [value, tapButton]);

  return (
    <Grid container justifyContent="center" style={{ minHeight: "70vh" }}>
      <Grid
        item
        xs={8}
        style={{ backgroundColor: "#F1ECF5", borderRadius: 12 }}
      >
        <Paper style={{ margin: 12 }}>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            centered
            TabIndicatorProps={{ sx: { backgroundColor: "#7b35ba" } }}
            textColor="secondary"
            // indicatorColor="secondary"
            size="small"
            sx={{
              // "& button": { backgroundColor: "blue" },
              // "& button:active": { backgroundColor: "yellow" },
              // "& button:focus": { backgroundColor: "black" },
              "& button:hover": { backgroundColor: "#F1ECF5" },
              "& button.Mui-selected": {
                backgroundColor: "#7b35ba",
                color: "white",
              },
            }}
          >
            <Tab
              style={{ textTransform: "none" }}
              value="CONFIRM"
              label="Chờ xác nhận"
            />
            <Tab
              style={{ textTransform: "none" }}
              value="PENDING"
              label="Đang xử lí"
            />
            <Tab
              style={{ textTransform: "none" }}
              value="DELIVERING"
              label="Đang giao"
            />
            <Tab
              style={{ textTransform: "none" }}
              value="DELIVERED"
              label="Đã giao"
            />
            <Tab
              style={{ textTransform: "none" }}
              value="CANCEL"
              label="Hoàn tiền/đã huỷ"
            />
          </Tabs>
        </Paper>

        <Paper style={{ padding: 12, margin: 12 }}>
          {/* <Stack direction="row" display="flex" justifyContent="space-around">
            <div style={{ minWidth: 300 }}>Sản phẩm</div>
            <div>Tổng đơn hàng</div>
            <div>Trạng thái</div>
            <div>Vận chuyển</div>
            <div style={{ marginRight: 60 }}>Thao tác</div>
          </Stack> */}

          <Grid container justifyContent="center" style={{ color: " #666666" }}>
            <Grid
              item
              xs={4}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Sản phẩm
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Tổng đơn hàng
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                color: "#666666",
              }}
            >
              Trạng thái
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Vận chuyển
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Thao tác
            </Grid>
          </Grid>
        </Paper>

        {listPost.map((item) => {
          return (
            <Paper
              key={item.id}
              style={{ padding: 8, marginTop: 4, margin: 12 }}
            >
              <div style={{ marginBottom: 4 }}>
                {item.Transaction.User.firstName +
                  " " +
                  item.Transaction.User.lastName}
              </div>
              <Divider></Divider>
              <Grid container justifyContent="center" style={{ marginTop: 8 }}>
                <Grid
                  item
                  xs={4}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <img
                    alt=""
                    src={item.Post.PostImages[0].imagePath}
                    width={80}
                    height={80}
                  ></img>
                  <p style={{ marginLeft: 16 }}>{item.Post.title}</p>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <p>
                    {" "}
                    {(item.Post.price === -1 &&
                      item.Post.PostAuction.priceEnd) ||
                      item.Post.price}
                  </p>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {item.status === "CONFIRM" && "Chờ xác nhận"}
                  {item.status === "PENDING" && "Đang đóng gói"}
                  {item.status === "DELIVERING" && "Đang giao"}
                  {item.status === "DELIVERED" && "Đã giao"}
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Vận chuyển
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {item.status === "CONFIRM" && (
                    <Button
                      size="small"
                      style={{
                        backgroundColor: "#F50057",
                        textTransform: "none",
                        color: "white",
                      }}
                      onClick={() => {
                        handleChangeStatusOrderPost(item.id, "PENDING");
                      }}
                    >
                      Xác nhận
                    </Button>
                  )}
                  {item.status === "PENDING" && (
                    <Button
                      size="small"
                      style={{
                        backgroundColor: "#F50057",
                        textTransform: "none",
                        color: "white",
                      }}
                      onClick={() => {
                        getUserInfo();
                        hanlePending();
                        setPostId(item.id);
                      }}
                    >
                      <AirportShuttleIcon />
                      Chuẩn bị hàng
                    </Button>
                  )}
                  {item.status === "DELIVERING" && (
                    <Button
                      size="small"
                      style={{
                        backgroundColor: "#F50057",
                        textTransform: "none",
                        color: "white",
                      }}
                      onClick={() => {
                        handleChangeStatusOrderPost(item.id, "DELIVERED");
                      }}
                    >
                      <LocalShippingIcon />
                      Đã giao
                    </Button>
                  )}
                  {item.status === "DELIVERED" && (
                    <Stack direction="row">
                      <Button
                        size="small"
                        style={{
                          backgroundColor: "#F50057",
                          textTransform: "none",
                          color: "white",
                        }}
                        onClick={() => {
                          handleChangeStatusOrderPost(item.id, "DELIVERED");
                        }}
                      >
                        <LocalShippingIcon />
                        Xác nhận
                      </Button>
                      {/* <Button
                        size="small"
                        style={{
                          backgroundColor: "#F50057",
                          textTransform: "none",
                          color: "white",
                        }}
                        onClick={() => {
                          handleChangeStatusOrderPost(item.id, "DELIVERED");
                        }}
                      >
                        <LocalShippingIcon />
                        Đã giao
                      </Button> */}
                    </Stack>
                  )}
                </Grid>
              </Grid>
            </Paper>
          );
        })}
      </Grid>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Chuẩn bị hàng
          </Typography>
          <Stack direction="column" spacing={2} paddingTop={2}>
            <TextField
              SelectProps={{ MenuProps: { disableScrollLock: true } }}
              name="cateParentId"
              id="standard-size-small"
              select
              color="secondary"
              label="Đơn vị vận chuyển"
              // size="small"
              variant="outlined"
              // onChange={(e) => {
              //   setCateParentId(e.target.value);
              // }}
            >
              {listShipping.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <div
                    onClick={() => {
                      // setCateId(item.id);
                      // getAllCategoryChild(item.id);
                      // setShowCateInput(true);
                      setShipping(item.name);
                    }}
                    style={{ color: "black" }}
                  >
                    {item.name}
                  </div>
                </MenuItem>
              ))}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDateTimePicker
                // size="small"
                label="Date desktop"
                inputFormat="MM/DD/YYYY"
                value={valueTime}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField {...params} color="secondary" />
                )}
              />
            </LocalizationProvider>
            <TextField
              id="outlined-basic"
              label="Lưu ý"
              color="secondary"
              variant="outlined"
            />
            <p>Địa chỉ lấy hàng: {address} </p>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button
                style={{
                  textTransform: "none",
                  border: "0.5px solid black",
                }}
              >
                Huỷ
              </Button>
              <Button
                style={{
                  backgroundColor: "#F50057",
                  textTransform: "none",
                  color: "white",
                }}
                onClick={() => {
                  handleChangeStatusOrderPost(postId, "DELIVERING");
                  setOpenModal(false);
                }}
              >
                Xác nhận
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Grid>
  );
}

export default MyOrderSellPage;
