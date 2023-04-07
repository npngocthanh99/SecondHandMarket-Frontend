import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Modal,
  Typography,
} from "@material-ui/core";
import { IconButton, Pagination, Paper, Tab, Tabs } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
};

function MyBodyManagePosting() {
  const [listPostShow, setListPostShow] = useState([]);
  const [listPostHide, setListPostHide] = useState([]);
  const [listPostLike, setListPostLike] = useState([]);
  const [listPostBid, setListPostBid] = useState([]);
  const [value, setValue] = React.useState("1");
  const [hidePost, setHidePost] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [postId, setPostId] = useState("");
  const [isModalDeleteSuccess, setIsModalDeleteSuccess] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsModalDeleteSuccess(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const getUserInfoByUser = async () => {
    try {
      const { data } = await axios.get("/user/userInfo", {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });

      console.log(data.data);

      setUserInfo(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostIsShowingByUserId = async () => {
    try {
      const { data } = await axios.get(`/user/post/activeId/1/page/${page}`, {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      setListPostShow(data.data);
      setTotalPage(data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostBid = async () => {
    try {
      const { data } = await axios.get(`user/post/bid/page/${page}`, {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      setListPostBid(data.data);
      setTotalPage(data.totalPage);
    } catch (error) {
      console.log("err_getPostBid::::", error);
    }
  };

  const getPostIsHidingByUserId = async () => {
    try {
      const { data } = await axios.get(
        `/user/postHide/activeId/4/page/${page}`,
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );

      setListPostHide(data.data);
      setTotalPage(data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const hidePostByPostId = async (postId, activeId) => {
    try {
      const { data } = await axios.put(
        "/user/updateActiveIdPost",
        {
          postId,
          activeId,
        },
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const showPostByPostId = async (postId, activeId) => {
    try {
      const { data } = await axios.put(
        "/user/updateActiveIdPost",
        {
          postId,
          activeId,
        },
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removePost = async (id) => {
    setIsModalDelete(false);
    try {
      await axios.delete(`/user/Post/${id}`, {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      setIsModalDeleteSuccess(true);
      getPostIsShowingByUserId();
      getPostBid();
    } catch (error) {
      console.log("err_removePost::", error);
    }
  };

  const getPostsLike = async () => {
    try {
      const { data } = await axios.get("/user/Post/like", {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      const _listPost = data.data.filter((item) => item.Post !== null);
      console.log("getPostLike:::::", _listPost);
      const __listPost = paginate(_listPost, 5, page);
      setListPostLike(__listPost);
    } catch (error) {
      console.log("err_getPostsLike:::", error);
    }
  };

  const paginate = (listPost, page_size, page_number) => {
    const totalNumberPage = Math.ceil(listPost.length / 5);
    setTotalPage(totalNumberPage);
    return listPost.slice(
      (page_number - 1) * page_size,
      page_number * page_size
    );
  };

  useEffect(() => {
    if (value === "1") {
      getPostIsShowingByUserId();
    }
    if (value === "2") {
      getPostIsHidingByUserId();
    }
    if (value === "3") {
      getPostsLike();
    }
    if (value === "4") {
      getPostBid();
    }
  }, [value, page]);

  useEffect(() => {
    getUserInfoByUser();
  }, []);

  useEffect(() => {
    getPostIsHidingByUserId();
    // getPostBid();
  }, [showPost]);

  useEffect(() => {
    getPostIsShowingByUserId();
    getPostBid();
  }, [hidePost]);

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        style={{ minHeight: "70vh", borderRadius: 12, color: " #666666" }}
      >
        <Grid
          item
          xs={6}
          style={{ backgroundColor: "#F1ECF5", borderRadius: 12 }}
        >
          <Paper
            style={{ padding: 8, marginBottom: 12, margin: 12 }}
            // sx={{ backgroundColor: "red" }}
          >
            <Stack direction="row" spacing={4}>
              <img
                src={
                  userInfo.avatarImg ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                }
                alt="Avatar"
                style={{
                  // border: "2px solid #7b35ba",
                  verticalAlign: "middle",
                  width: 75,
                  height: 75,
                  borderRadius: "50%",
                }}
              />
              <Stack direction="column" spacing={1}>
                <p style={{ fontSize: 24 }}>
                  {userInfo.firstName} {userInfo.lastName}
                </p>
                <Button
                  style={{
                    textTransform: "none",
                    // color: " #666666",
                    backgroundColor: "#FFD501",
                  }}
                  // color="secondary"
                  // color
                  // variant="outlined"
                  size="small"
                  onClick={() => {
                    navigate(`/profile/user/${userInfo.userId}`);
                  }}
                >
                  Trang cá nhân
                </Button>
              </Stack>
            </Stack>
          </Paper>
          <Paper style={{ margin: 8 }}>
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{
                  sx: { backgroundColor: "#7b35ba" },
                }}
                size="small"
                sx={{
                  // "& button": { backgroundColor: "blue",  },
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
                  onClick={() => {
                    setPage(1);
                  }}
                  value="1"
                  label="Tin đăng"
                  defaultValue={1}
                  style={{ textTransform: "none" }}
                />
                <Tab
                  onClick={() => {
                    setPage(1);
                  }}
                  value="4"
                  label="Đấu giá"
                  // defaultValue={4}
                  style={{ textTransform: "none" }}
                />
                <Tab
                  onClick={() => {
                    setPage(1);
                  }}
                  value="2"
                  label="Ẩn"
                  style={{ textTransform: "none" }}
                />
                <Tab
                  onClick={() => {
                    setPage(1);
                  }}
                  value="3"
                  label="Yêu thích"
                  style={{ textTransform: "none" }}
                />
              </Tabs>
            </Box>
          </Paper>
          <div>
            {value === "1" &&
              listPostShow.map((item) => {
                return (
                  <Paper
                    key={item.id}
                    style={{
                      marginLeft: 12,
                      marginRight: 12,
                      marginBottom: 12,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      padding={1}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" spacing={2}>
                        <img
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(`/post/${item.id}`);
                          }}
                          alt=""
                          width={100}
                          height={100}
                          src={item.image.imagePath}
                        ></img>
                        <Stack
                          direction="column"
                          spacing={1}
                          justifyContent="start"
                          // alignItem="center"
                          alignContent="center"
                        >
                          <p>ID: {item.id}</p>
                          <p>{item.title}</p>
                          <p style={{ color: "red" }}>
                            {item.price === Number(0) ? "Miễn phí" : item.price}
                          </p>
                          <p>{item.createdAt}</p>
                        </Stack>
                      </Stack>
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <ButtonGroup
                          size="small"
                          aria-label="small button group"
                        >
                          <Button
                            color="error"
                            size="small"
                            variant="outlined"
                            style={{
                              textTransform: "none",
                              boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px ",
                            }}
                            onClick={() => {
                              navigate(`/edit/post/${item.id}`);
                            }}
                          >
                            <EditIcon style={{ paddingRight: 4 }} />
                            Sửa
                          </Button>
                          <Button
                            color="primary"
                            size="small"
                            variant="outlined"
                            style={{
                              textTransform: "none",
                              boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px ",
                            }}
                            onClick={() => {
                              console.log(item.id);
                              hidePostByPostId(item.id, 4);
                              setHidePost(!hidePost);
                            }}
                          >
                            <VisibilityOffOutlinedIcon
                              style={{ paddingRight: 4 }}
                            />
                            Ẩn
                          </Button>

                          <Button
                            color="secondary"
                            size="small"
                            variant="outlined"
                            style={{
                              textTransform: "none",
                              boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px ",
                            }}
                            onClick={() => {
                              console.log(item.id);
                              // removePost(item.id);
                              setIsModalDelete(true);
                              setPostId(item.id);
                              setHidePost(!hidePost);
                              setOpen(true);
                            }}
                          >
                            <DeleteIcon style={{ paddingRight: 4 }} />
                            Xoá
                          </Button>

                          {/* {buttons} */}
                        </ButtonGroup>
                      </div>
                    </Stack>
                  </Paper>
                );
              })}

            {value === "4" &&
              listPostBid.map((item) => {
                return (
                  <Paper
                    key={item.id}
                    style={{
                      marginLeft: 12,
                      marginRight: 12,
                      marginBottom: 12,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      padding={1}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" spacing={2}>
                        <img
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(`/post/${item.id}`);
                          }}
                          alt=""
                          width={100}
                          height={100}
                          src={item.image.imagePath}
                        ></img>
                        <Stack
                          direction="column"
                          spacing={1}
                          justifyContent="start"
                        >
                          <p>ID: {item.id}</p>
                          <p>{item.title}</p>
                          <p style={{ color: "red" }}>Đấu giá</p>
                          <p>{item.createdAt}</p>
                        </Stack>
                      </Stack>
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <ButtonGroup
                          size="small"
                          aria-label="small button group"
                        >
                          <Button
                            color="error"
                            size="small"
                            variant="outlined"
                            style={{
                              // borderColor: "#F9CF58",
                              // marginRight: 4,
                              textTransform: "none",
                              boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px ",
                            }}
                            onClick={() => {
                              navigate(`/edit/post/${item.id}`);
                            }}
                          >
                            <EditIcon style={{ paddingRight: 4 }} />
                            Sửa
                          </Button>
                          <Button
                            color="primary"
                            size="small"
                            variant="outlined"
                            style={{
                              textTransform: "none",
                              boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px ",
                            }}
                            onClick={() => {
                              console.log(item.id);
                              hidePostByPostId(item.id, 4);
                              setHidePost(!hidePost);
                            }}
                          >
                            <VisibilityOffOutlinedIcon
                              style={{ paddingRight: 4 }}
                            />
                            Ẩn
                          </Button>

                          <Button
                            color="secondary"
                            size="small"
                            variant="outlined"
                            style={{
                              textTransform: "none",
                              boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px ",
                            }}
                            onClick={() => {
                              setIsModalDelete(true);
                              setPostId(item.id);
                              setHidePost(!hidePost);
                              setOpen(true);
                            }}
                          >
                            <DeleteIcon style={{ paddingRight: 4 }} />
                            Xoá
                          </Button>

                          {/* {buttons} */}
                        </ButtonGroup>
                      </div>
                    </Stack>
                  </Paper>
                );
              })}
            {/* {(value === "2") & (listPostHide === []) && (
              <p style={{ marginLeft: 12, marginRight: 12, marginBottom: 12 }}>
                Chưa có bài đăng nà
              </p>
            )} */}
            {value === "2" &&
              listPostHide.map((item) => {
                return (
                  <Paper
                    key={item.id}
                    style={{
                      marginLeft: 12,
                      marginRight: 12,
                      marginBottom: 12,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      padding={1}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" spacing={2}>
                        <img
                          style={{
                            filter: "grayscale(100%)",
                            cursor: "not-allowed",
                          }}
                          alt=""
                          width={100}
                          height={100}
                          src={item.image.imagePath}
                        ></img>
                        <Stack
                          direction="column"
                          spacing={1}
                          justifyContent="start"
                        >
                          <p>ID: {item.id}</p>
                          <p>{item.title}</p>
                          <p>
                            {(item.price === -1 && "Đấu giá") ||
                              (item.price === 0 && "Miễn phí") ||
                              item.price}
                          </p>
                          <p>{item.createdAt}</p>
                        </Stack>
                      </Stack>
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          size="small"
                          color="primary"
                          variant="outlined"
                          style={{
                            textTransform: "none",
                            marginRight: 4,
                            boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px ",
                          }}
                          onClick={() => {
                            showPostByPostId(item.id, 1);
                            setShowPost(!showPost);
                          }}
                        >
                          <RemoveRedEyeOutlinedIcon
                            style={{ paddingRight: 4 }}
                          />
                          Hiển thị
                        </Button>
                      </div>
                    </Stack>
                  </Paper>
                );
              })}

            {value === "3" &&
              listPostLike.map((item) => {
                return (
                  <Paper
                    key={item.Post.id}
                    style={{
                      marginLeft: 12,
                      marginRight: 12,
                      marginBottom: 12,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      padding={1}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" spacing={2}>
                        <img
                          style={{
                            // filter: "grayscale(100%)",
                            cursor: "pointer",
                          }}
                          alt=""
                          width={100}
                          height={100}
                          src={item.Post.PostImages[0].imagePath}
                          onClick={() => {
                            navigate(`/Post/${item.Post.id}`);
                          }}
                        ></img>
                        <Stack
                          direction="column"
                          spacing={1}
                          justifyContent="start"
                        >
                          <p>ID: {item.Post.id}</p>
                          <p>{item.Post.title}</p>
                          <p style={{ color: "red" }}>
                            {(item.Post.price === -1 && "Đấu giá") ||
                              (item.Post.price === 0 && "Miễn phí") ||
                              item.Post.price}
                          </p>
                          <p>{item.Post.createdAt}</p>
                        </Stack>
                      </Stack>
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <IconButton
                          size="large"
                          color="primary"
                          // variant="outlined"
                          // style={{
                          //   marginRight: 4,
                          //   // boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px ",
                          // }}
                          onClick={() => {
                            // showPostByPostId(item.id, 1);
                            // setShowPost(!showPost);
                          }}
                        >
                          <ThumbUpIcon
                            fontSize="large"
                            style={{ paddingRight: 4, fill: "#7b35ba" }}
                          />
                        </IconButton>
                      </div>
                    </Stack>
                  </Paper>
                );
              })}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={totalPage}
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </Grid>
      </Grid>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {isModalDelete && (
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography id="modal-modal-description" sx={{ m: 2 }}>
                  Bạn có chắc muốn xoá bài viết này!
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  paddingTop={4}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    style={{
                      textTransform: "none",
                      backgroundColor: "#7b35ba",
                      color: "white",
                    }}
                    onClick={() => {
                      removePost(postId);
                    }}
                  >
                    Có
                  </Button>
                  <Button
                    size="small"
                    style={{
                      textTransform: "none",
                      backgroundColor: "#BDBDBD",
                      color: "white",
                    }}
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Không
                  </Button>
                </Stack>
              </Stack>
            )}
            {isModalDeleteSuccess && (
              <div>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CheckCircleIcon
                    style={{
                      fill: "green",
                      width: 100,
                      height: 100,
                      paddingBottom: 20,
                    }}
                  />
                  <Typography id="modal-modal-description" sx={{ m: 2 }}>
                    Xoá bài viết thành công!
                  </Typography>
                </Stack>
              </div>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default MyBodyManagePosting;
