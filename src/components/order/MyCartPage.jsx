import { Button, Checkbox, Grid, IconButton, Paper } from "@material-ui/core";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useState } from "react";
import { Pagination } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { formatCash } from "../../helps/common";

function MyCartPage() {
  const [listPost, setListPost] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [postId, setPostId] = useState(0);
  const [checked, setChecked] = useState(true);
  const [amount, setAmount] = useState(0);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const navigate = useNavigate();

  //  GET POST
  const getPostCart = async () => {
    try {
      const { data } = await axios.get(`/user/postCart/${page}`, {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      console.log("getPostCart:::", data.data.rows);
      setListPost(data.data.rows);
      setTotalPage(Math.ceil(data.data.count / 5));
    } catch (error) {
      console.log("error_getPostCart:::", error);
    }
  };

  // HANDLE PAGING
  const handleChangePaging = (event, value) => {
    console.log("event :::", value);
    setPage(value);
  };

  // REMOVE POST CART
  const handleRemovePost = async (postId) => {
    try {
      console.log("postId in hanleremove;::", postId);
      await axios.delete(`/user/postCart/remove/${postId}`, {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      await axios.get("/user/cart/qty", {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      setPostId(postId);
    } catch (error) {
      console.log("err_removePost", error);
    }
  };

  // HANDLE CHECKBOX
  const handleCheckBox = async (checked, postId) => {
    try {
      await axios.put(
        "/user/postCart/checked",
        {
          checked,
          postId,
        },
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // GET LISTPOST CHECKED;

  const getListPostChecked = async () => {
    try {
      const { data } = await axios.get("/user/postCart/checked/1", {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      console.log("getListPostBychecked:::", data.data);
      // if (data.data.Post.id === undefined) {
      //   data.data = [];
      // }
      const listAmount = [];
      data.data.forEach((item) => {
        if (item.Post.price === -1) {
          listAmount.push(item.PostAuction.priceEnd);
        } else {
          listAmount.push(item.Post.price);
          console.log("so tien thiệt :::", item.Post.price);
        }
      });
      console.log("listAmount::;", listAmount);
      const amount = listAmount.reduce((a, b) => a + b, 0);
      console.log("amount:::", amount);
      setAmount(amount);
    } catch (error) {
      console.log("error_getListPostChecked:::", error);
    }
  };

  // HANDLE BUY TO CHECKOUT

  const hanleBuyToCheckout = async () => {
    navigate("/checkout");
  };

  useEffect(() => {
    getPostCart();
    getListPostChecked();
  }, [page, postId, checked]);

  return (
    <Grid
      container
      justifyContent="center"
      style={{ minHeight: "70vh", borderRadius: 8 }}
    >
      <Grid
        item
        xs={5}
        style={{ backgroundColor: "#F1ECF5", borderRadius: 12 }}
      >
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          <ShoppingCartIcon
            style={{
              width: 30,
              height: 30,
              margin: 12,
            }}
          />
          <p>Giỏ hàng</p>
        </div>
        <Paper
          style={{
            marginLeft: 12,
            marginRight: 12,
            marginBottom: 12,
            backgroundColor: "#7b35ba",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            padding={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <div style={{ marginLeft: 40, color: "white" }}>Tên sản phẩm</div>
            <div style={{ display: "inline-flex", justifyContent: "flex-end" }}>
              <div style={{ marginRight: 200, color: "white" }}>giá</div>
            </div>
          </Stack>
        </Paper>
        <Stack direction="column">
          {listPost.length === 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "gray",
              }}
            >
              <p>Chưa có sản phẩm nào trong giỏ hàng</p>
            </div>
          )}
          {listPost.map((item) => {
            return (
              <Paper
                key={item.id}
                style={{ marginLeft: 12, marginRight: 12, marginBottom: 12 }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  padding={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={2}>
                    <Checkbox
                      {...label}
                      checked={item.checked}
                      style={{
                        color: "#7b35ba",
                      }}
                      onChange={(event) => {
                        handleCheckBox(event.target.checked, item.postId);
                      }}
                      onClick={() => {
                        setChecked(!checked);
                      }}
                    />
                    <img
                      src={item.image.imagePath}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/post/${item.postId}`);
                      }}
                      alt=""
                      width={70}
                      height={70}
                    ></img>
                    <Stack
                      direction="column"
                      spacing={1}
                      justifyContent="center"
                    >
                      <p>{item.Post.title}</p>
                      <p>{item.Post.createdAt}</p>
                    </Stack>
                  </Stack>
                  <div
                    style={{
                      display: "inline-flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div style={{ marginRight: 100, justifyContent: "center" }}>
                      <p>
                        {item.Post.price === -1
                          ? formatCash(String(item.PostAuction.priceEnd))
                          : formatCash(String(item.Post.price))}{" "}
                        đ
                      </p>
                    </div>
                    <IconButton
                      onClick={() => {
                        console.log("postId:::", item.postId);
                        handleRemovePost(item.postId);
                      }}
                    >
                      <ClearIcon style={{ fill: "#7b35ba" }} />
                    </IconButton>
                  </div>
                </Stack>
              </Paper>
            );
          })}
          <div style={{ display: "inline-flex", justifyContent: "center" }}>
            <Pagination
              count={totalPage}
              page={page}
              onChange={handleChangePaging}
            />
          </div>
        </Stack>
      </Grid>
      <Grid item xs={3} style={{ marginLeft: 12 }}>
        <Stack direction="column" justifyContent="center" spacing={2}>
          <Paper
            style={{
              backgroundColor: "#7b35ba",
              display: "inline-flex",
              justifyContent: "center",
              color: "white",
            }}
          >
            <p style={{ padding: 4 }}>Tổng thanh toán</p>
          </Paper>
          <div
            style={{
              display: "inline-flex",
              justifyContent: "center",
              backgroundColor: "#F1ECF5",
              borderRadius: 4,
            }}
          >
            <p style={{ fontSize: 24 }}>{formatCash(String(amount))} đ</p>
          </div>
          <Button
            disabled={listPost.length === 0 ? true : false}
            size="large"
            variant="contained"
            style={{ backgroundColor: "#FFD600" }}
            onClick={hanleBuyToCheckout}
          >
            <p>Mua hàng</p>
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default MyCartPage;
