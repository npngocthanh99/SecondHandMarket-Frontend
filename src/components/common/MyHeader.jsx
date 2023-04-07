import {
  Badge,
  Button,
  Divider,
  Fade,
  Grid,
  InputBase,
  makeStyles,
  Menu,
  MenuItem,
  styled,
} from "@material-ui/core";
import React, { useState } from "react";
import MySearchBar from "./MySearchBar";
import { useNavigate } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ChatIcon from "@mui/icons-material/Chat";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HomeIcon from "@mui/icons-material/Home";
// import { Menu } from '@mui/material/Menu';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { IconButton, Stack } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { io } from "socket.io-client";
const socket = io();

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

const useStyles = makeStyles((theme) => ({
  make_position: {
    backgroundColor: "#7b35ba",
    position: "fixed",
    top: 0,
    // right: 0,
    // left: 0,
    width: "100%",
    zIndex: 100,

    // width: '100%'
  },

  // menu_cus: {
  //   paddingTop: 8,
  //   flexDirection: "column",
  //   display: "flex",
  // },
}));

function MyHeader() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [qtyCart, setQtyCart] = useState(0);
  const [listBiddingPost, setBiddingPost] = useState([]);
  const [qtyBiddingPost, setQtyBiddingPost] = useState(0);
  let cartQty = useSelector((state) => state.cart.cart);

  const handleBtnChat = () => {
    navigate("/chat");
  };

  const handBtnHome = () => {
    navigate("/");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  // GET QTY CART

  const getQtyCart = async () => {
    try {
      const { data } = await axios.get("/user/cart/qty", {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      console.log("data_getQTYCart::::", data);
      // setQtyCart(data.data);
    } catch (error) {
      console.log("err_getQtyCart:::", error);
    }
    console.log("cartQty::", cartQty);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // bid button
  const [anchorElBid, setAnchorElBid] = React.useState(null);
  const openBid = Boolean(anchorElBid);
  const handleClickBid = async (event) => {
    setAnchorElBid(event.currentTarget);
    await getBiddingPostByUser();
  };
  const handleCloseBid = () => {
    setAnchorElBid(null);
  };

  const handleClickBiddingPost = (postId) => {
    navigate(`/post/${postId}`);
    window.location.reload(false);
  };

  const getBiddingPostByUser = async () => {
    try {
      const data = await axios.get("/user/biddingPost", {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      setBiddingPost(data.data.data);
      // setQtyBiddingPost(data.data.count);
    } catch (error) {
      console.log("err_getBiddingPost:::", error);
    }
  };

  // const getQtyCart = async () => {
  //   try {
  //     const {data} = await axios.get('/')
  //   } catch (error) {

  //   }
  // }

  useEffect(() => {
    getQtyCart();
    getBiddingPostByUser();
    socket.on("qtyBiddingPost", ({ qty, userId }) => {
      if (String(userId) === String(localStorage["userId"])) {
        setQtyBiddingPost(qty);
        console.log("so luong dau gia:::", qty);
      } else {
        return;
      }
    });

    socket.on("qtyCart", ({ qty, userId }) => {
      if (String(userId) === String(localStorage["userId"])) {
        setQtyCart(qty);
      } else {
        return;
      }
    });

    return () => {
      socket.off("qtyBiddingPost");
      socket.off("qtyCart");
    };
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      style={{ marginBottom: 114, color: "white" }}
    >
      <Grid item xs={12}>
        <div className={classes.make_position}>
          <Grid container justifyContent="center">
            <Grid item xs={8}>
              {/* <div className={classes.menu_cus}> */}
              <Stack
                direction="row"
                justifyContent="space-between"
                paddingTop={1}
                // spacing={6}
                // style={{
                //   direction: "row",
                //   display: "flex",
                //   justifyContent: "space-between",
                //   alignContent: "center",
                //   // alignItems: "center",
                // }}
              >
                <div
                  onClick={() => {
                    navigate("/");
                  }}
                  style={{
                    maxWidth: 200,
                    maxHeight: 56,
                    marginRight: 24,
                    marginTop: -12,
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="/upload/logo1.png"
                    alt="logo"
                    style={{ width: 200, height: 60 }}
                  />
                </div>

                <div>
                  <Button
                    onClick={() => {
                      handBtnHome();
                    }}
                    size="small"
                    style={{
                      color: "white",
                      textTransform: "none",
                      fontSize: 14,
                    }}
                  >
                    <HomeIcon />
                    Trang chủ
                  </Button>
                </div>

                <div>
                  <Button
                    style={{
                      color: "white",
                      textTransform: "none",
                      fontSize: 14,
                    }}
                    size="small"
                    onClick={() => {
                      navigate("/managePosting");
                    }}
                  >
                    <FormatListBulletedIcon />
                    Quản lý tin
                  </Button>
                </div>

                <div>
                  <Button
                    size="small"
                    style={{
                      color: "white",
                      textTransform: "none",
                      fontSize: 14,
                    }}
                    aria-controls={open ? "fade-menu" : undefined}
                    // aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <ShoppingBagIcon />
                    Đơn hàng
                  </Button>
                </div>
                <div>
                  <Button
                    size="small"
                    style={{
                      color: "white",
                      textTransform: "none",
                      fontSize: 14,
                    }}
                    aria-controls={openBid ? "fade-menu" : undefined}
                    // aria-haspopup="true"
                    aria-expanded={openBid ? "true" : undefined}
                    onClick={handleClickBid}
                  >
                    <Badge
                      badgeContent={Number(qtyBiddingPost)}
                      color="secondary"
                      overlap="rectangular"
                    >
                      <HourglassEmptyIcon />
                    </Badge>
                    Đấu giá
                  </Button>
                </div>

                <div>
                  <Button
                    hidden
                    disable
                    style={{
                      color: "white",
                      textTransform: "none",
                      fontSize: 14,
                      // marginLeft: -70,
                    }}
                    onClick={() => {
                      // handleBtnChat();
                    }}
                    size="small"
                  >
                    <ChatIcon />
                    Chat
                  </Button>
                </div>

                <div>
                  <IconButton
                    style={{ color: "white" }}
                    onClick={handleCart}
                    size="small"
                  >
                    <Badge
                      badgeContent={Number(qtyCart)}
                      color="secondary"
                      overlap="rectangular"
                    >
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </div>
              </Stack>
              <MySearchBar></MySearchBar>
              {/* </div> */}
            </Grid>
          </Grid>
        </div>
      </Grid>
      <div>
        {/* <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button> */}
        <Menu
          disableScrollLock={true}
          id="basic-menu"
          anchorEl={anchorElBid}
          open={openBid}
          onClose={handleCloseBid}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {listBiddingPost.length === 0 ? (
            <p style={{ fontSize: 14, color: "#7b35ba", padding: 4 }}>
              Không có bài viết nào
            </p>
          ) : (
            listBiddingPost.map((item) => {
              return (
                <>
                  {/* <Divider /> */}
                  <MenuItem
                    key={item.postId}
                    onClick={() => {
                      handleCloseBid();
                      handleClickBiddingPost(item.postId);
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      style={{ margin: -8 }}
                    >
                      <img
                        alt=""
                        width={30}
                        height={30}
                        src={item.Post.PostImages[0].imagePath}
                      ></img>
                      <p style={{ fontSize: 14, color: "#7b35ba" }}>
                        {" "}
                        {item.Post.title}
                      </p>
                    </Stack>
                  </MenuItem>
                </>
              );
            })
          )}
        </Menu>
      </div>
      <div>
        <Menu
          disableScrollLock={true}
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem
            style={{ color: "#7b35ba ", fontSize: 14 }}
            onClick={() => {
              navigate("/order/buy");
              handleClose();
            }}
          >
            Đơn mua
          </MenuItem>
          <Divider />
          <MenuItem
            style={{ color: "#7b35ba ", fontSize: 14 }}
            onClick={() => {
              navigate("/order/sell");
              handleClose();
            }}
          >
            Đơn Bán
          </MenuItem>
          <Divider />
          <MenuItem
            style={{ color: "#7b35ba ", fontSize: 14 }}
            onClick={() => {
              navigate("/order/overview");
              handleClose();
            }}
          >
            Tổng quan
          </MenuItem>
        </Menu>
      </div>
    </Grid>
  );
}

export default MyHeader;
