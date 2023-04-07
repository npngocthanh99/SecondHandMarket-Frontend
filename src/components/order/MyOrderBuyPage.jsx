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
import { Tab, Tabs } from "@mui/material";
import { getPostingBuyByUser } from "../../API/user_api";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import ArticleIcon from "@mui/icons-material/Article";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 300,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 8,
  p: 4,
};

// const styleFl = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

function MyOrderBuyPage() {
  const [value, setValue] = useState("ALL");
  const [listPost, setListPost] = useState([]);
  const [tapButton, setTapButton] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // const [openModalFl, setOpenModalFl] = useState(false);
  const [status, setStatus] = useState("");
  const [confirm, setConfirm] = useState("gray");
  const [pending, setPending] = useState("gray");
  const [delivering, setDelivering] = useState("gray");
  const [delivered, setDelivered] = useState("gray");

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickImg = (status) => {
    setOpenModal(true);
    if (status === "CONFIRM") {
      setConfirm("#2DC258");
      setPending("gray");
      setDelivering("gray");
      setDelivered("gray");
    }
    if (status === "PENDING") {
      setConfirm("#2DC258");
      setPending("#2DC258");
      setDelivering("gray");
      setDelivered("gray");
    }
    if (status === "DELIVERING") {
      setConfirm("#2DC258");
      setPending("#2DC258");
      setDelivering("#2DC258");
      setDelivered("gray");
    }
    if (status === "DELIVERED") {
      setConfirm("#2DC258");
      setPending("#2DC258");
      setDelivering("#2DC258");
      setDelivered("#2DC258");
    }
  };

  const handleChangeStatusOrderByBuyder = async (postId, status) => {
    console.log("hello");
    try {
      const { data } = await axios.put(
        "/user/order/buy/updateStatus",
        {
          postId,
          status,
        },
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );
      console.log(data.data);
      return data.data;
    } catch (error) {}
  };

  const getOrderPostings = async () => {
    try {
      setListPost(await getPostingBuyByUser(value));
    } catch (error) {}
  };

  const hanlePending = async () => {
    try {
      setOpenModal(true);
    } catch (error) {}
  };

  useEffect(() => {
    // getListOrderBuyPost();
    getOrderPostings();
  }, [value]);

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
            <Tab style={{ textTransform: "none" }} value="ALL" label="Tất cả" />
            <Tab
              style={{ textTransform: "none" }}
              value="CONFIRM"
              label="Chờ xác nhận"
              // onClick={() => {
              //   console.log("confirm");
              //   // getOrderPostings("CONFIRM");
              //   // setValue("CONFIRM");
              // }}
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
            <Paper style={{ padding: 8, marginTop: 4, margin: 12 }}>
              <div style={{ marginBottom: 4 }}>
                {item.Post.User.firstName + " " + item.Post.User.lastName}
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
                    onClick={() => {
                      handleClickImg(item.status);
                    }}
                  ></img>
                  <p style={{ marginLeft: 8 }}>{item.Post.title}</p>
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
                  {/* {item.status === "CONFIRM" && "Chờ xác nhận"}
                  {item.status === "PENDING" && "Đang đóng gói"}
                  {item.status === "DELIVERING" && "Đang giao"} */}
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
                  {/* Vận chuyển */}
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
                  {/* {item.status === "CONFIRM" && (
                    <Button
                      size="small"
                      style={{
                        backgroundColor: "#F50057",
                        textTransform: "none",
                      }}
                      onClick={() => {
                        // handleChangeStatusOrderPost(item.id, "PENDING");
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
                        hanlePending();
                      }}
                    >
                      <AirportShuttleIcon />
                      Chuẩn bị hàng
                    </Button>
                  )} */}

                  {value === "DELIVERED" && (
                    <Stack direction="row">
                      <Button
                        size="small"
                        style={{
                          backgroundColor: "#F50057",
                          textTransform: "none",
                          color: "white",
                        }}
                        onClick={() => {
                          // handleChangeStatusOrderPost(item.id, "DELIVERED");
                          handleChangeStatusOrderByBuyder(
                            item.Post.id,
                            "RECEIVED"
                          );
                        }}
                      >
                        <TakeoutDiningIcon />
                        Đã nhận hàng
                      </Button>
                      {/* <Button
                        size="small"
                        style={{
                          backgroundColor: "#F50057",
                          textTransform: "none",
                          color: "white",
                        }}
                        onClick={() => {
                          // handleChangeStatusOrderPost(item.id, "DELIVERED");
                        }}
                      >
                        <LocalShippingIcon />
                        
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
            Chi tiết
          </Typography>

          <Grid container style={{ marginLeft: 30, marginTop: 12 }}>
            <Grid item xs={2.4}>
              <Stack
                direction="row"
                justifyContent="center"
                justifyItems="center"
                paddingBottom={1}
                alignItems="center"
              >
                <div
                  style={{
                    borderRadius: "50%",
                    width: 80,
                    height: 80,
                    border: `5px solid ${confirm} `,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ArticleIcon
                    style={{ width: 50, height: 50, fill: `${confirm}` }}
                  />
                </div>
                <div
                  style={{
                    width: 70,
                    height: 4,
                    backgroundColor: `${confirm}`,
                  }}
                ></div>
              </Stack>
              <p>Đơn đã đặt</p>
            </Grid>
            <Grid item xs={2.4}>
              <Stack
                direction="row"
                justifyContent="center"
                justifyItems="center"
                paddingBottom={1}
                alignItems="center"
              >
                <div
                  style={{
                    borderRadius: "50%",
                    width: 80,
                    height: 80,
                    border: `5px solid  ${pending}`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ArticleIcon
                    style={{ width: 50, height: 50, fill: `${pending}` }}
                  />
                </div>
                <div
                  style={{
                    width: 70,
                    height: 4,
                    backgroundColor: `${pending}`,
                  }}
                ></div>
              </Stack>
              <p>Xác nhận</p>
            </Grid>

            <Grid item xs={2.4}>
              <Stack
                direction="row"
                justifyContent="center"
                justifyItems="center"
                paddingBottom={1}
                alignItems="center"
              >
                <div
                  style={{
                    borderRadius: "50%",
                    width: 80,
                    height: 80,
                    border: `5px solid ${delivering} `,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ArticleIcon
                    style={{ width: 50, height: 50, fill: `${delivering}` }}
                  />
                </div>
                <div
                  style={{
                    width: 70,
                    height: 4,
                    backgroundColor: `${delivering}`,
                  }}
                ></div>
              </Stack>
              <p>Chờ lấy hàng</p>
            </Grid>
            <Grid item xs={2.4}>
              <Stack
                direction="row"
                justifyContent="center"
                justifyItems="center"
                alignItems="center"
                paddingBottom={1}
              >
                <div
                  style={{
                    borderRadius: "50%",
                    width: 80,
                    height: 80,
                    border: `5px solid ${delivered} `,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ArticleIcon
                    style={{ width: 50, height: 50, fill: `${delivered}` }}
                  />
                </div>
                <div
                  style={{
                    width: 70,
                    height: 4,
                    backgroundColor: `${delivered}`,
                  }}
                ></div>
              </Stack>
              <p>Đang giao</p>
            </Grid>
            <Grid item xs={2.4}>
              <div
                style={{
                  borderRadius: "50%",
                  width: 80,
                  height: 80,
                  border: `5px solid ${delivered} `,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <ArticleIcon
                  style={{ width: 50, height: 50, fill: `${delivered}` }}
                />
              </div>
              <p>Chờ lấy hàng</p>
            </Grid>
          </Grid>
          {/* <Grid container style={{ backgroundColor: "red" }}>
            <Grid
              item
              xs={2.4}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <div>sfsadf</div>
            </Grid>
            <Grid
              item
              xs={2.4}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <div> wrwe</div>
            </Grid>
            <Grid item xs={2.4}>
              wer
            </Grid>
            <Grid item xs={2.4}>
              wer
            </Grid>
            <Grid item xs={2.4}>
              wer
            </Grid> */}
          {/* </Grid> */}
        </Box>
      </Modal>
      {/* <Modal
        open={openModalFl}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleFl}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Chi tiết
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}
    </Grid>
  );
}

export default MyOrderBuyPage;
