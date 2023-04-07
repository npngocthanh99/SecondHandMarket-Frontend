import {
  Box,
  Button,
  Fade,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@material-ui/core";
import {
  Checkbox,
  Divider,
  Grid,
  Pagination,
  Paper,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
  getPosts,
  getUsers,
  removePostByPostId,
  searchPostByTitle as searchPost,
} from "../../API/user_api";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { paginate } from "../../helps/common";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    height: 74,
    alignItems: "center",
    // justifyContent: "center",
    alignContent: "center",
    borderRadius: 8,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

function MyManagePost() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [listPost, setListPost] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalDeleteSuccess, setIsModalDeleteSuccess] = useState(false);
  const [postId, setPostId] = useState("");
  const [page, setPage] = React.useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(0);

  const open = Boolean(anchorEl);
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setPostId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // paging
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const getListPosts = async () => {
    // setListPost([]);
    const { list, totalNumberPage } = paginate(await getPosts(), 6, page);
    setTotalNumberPage(totalNumberPage);
    setListPost(list);
  };

  const handleDeletePostByPostId = (id) => {
    handleClose();
    setOpenModal(true);
    setIsModalDelete(true);
    setPostId(id);
  };

  const handleYesBtn = async () => {
    setOpenModal(true);
    setIsModalDelete(false);
    const isSuccess = await removePostByPostId(postId);
    if (Number(isSuccess) === 1) {
      setIsModalDeleteSuccess(true);
      await getListPosts();
    } else {
      console.log("xoa khong thanh cong");
    }
  };

  const handleNoBtn = () => {
    setOpenModal(false);
  };

  const searchPostByTitle = async (title) => {
    if (!title) {
      setListPost(await getPosts());
      return;
    }
    setListPost(await searchPost(title));
  };

  useEffect(() => {
    getListPosts();
  }, [page]);

  return (
    <div>
      <div
        style={{
          margin: 40,
          overflow: "auto",
          fontSize: 14,
        }}
      >
        <Paper style={{ borderRadius: 12, width: 2400 }}>
          <Grid container>
            <Grid item xs={12} className={classes.row}>
              <TextField
                style={{ margin: 20 }}
                size="small"
                color="secondary"
                label="Tìm kiếm"
                variant="outlined"
                onChange={(e) => {
                  searchPostByTitle(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid container style={{ backgroundColor: "#E8EBEE" }}>
            <Grid item xs={0.4} className={classes.row}>
              <div style={{ marginLeft: 8 }}>
                <Checkbox
                  style={{
                    color: "#7b35ba",
                  }}
                  name="free"
                  size="small"
                  value={true}
                  color="secondary"
                  // onChange={() => {
                  //   setIsFreeProduct(true);
                  //   // setPrice(0);
                  // }}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={0.5}
              style={{ height: "10px !important" }}
              className={classes.row}
            >
              ID
            </Grid>
            <Grid item xs={0.5} className={classes.row}>
              <div>Hình ảnh</div>
            </Grid>
            <Grid item xs={1.5} className={classes.row}>
              <div>Tên sản phẩm</div>
            </Grid>
            <Grid item xs={1} className={classes.row}>
              <div>Giá</div>
            </Grid>
            <Grid item xs={1.7} className={classes.row}>
              <div>Mô tả</div>
            </Grid>
            <Grid item xs={0.5} className={classes.row}>
              <div>Tình trạng</div>
            </Grid>
            <Grid item xs={0.5} className={classes.row}>
              <div>Sản xuất</div>
            </Grid>
            <Grid item xs={0.5} className={classes.row}>
              <div>Bảo hành</div>
            </Grid>
            <Grid item xs={0.5} className={classes.row}>
              <div>Thể loại</div>
            </Grid>
            <Grid item xs={1.5} className={classes.row}>
              <div>Địa chỉ</div>
            </Grid>
            <Grid item xs={0.5} className={classes.row}>
              <div>Số lượng like</div>
            </Grid>
            <Grid item xs={0.9} className={classes.row}>
              <div>Trạng thái</div>
            </Grid>
            <Grid item xs={1} className={classes.row}>
              <div>userId</div>
            </Grid>
            <Grid item xs={0.5} className={classes.row}>
              <div>Action</div>
            </Grid>
          </Grid>
          {listPost.map((item) => {
            return (
              <div key={item.id}>
                <Divider />
                <Grid container>
                  <Grid item xs={0.4} className={classes.row}>
                    <div style={{ marginLeft: 8 }}>
                      <Checkbox
                        style={{
                          color: "#7b35ba",
                        }}
                        name="free"
                        size="small"
                        value={true}
                        color="secondary"
                        // onChange={() => {
                        //   setIsFreeProduct(true);
                        //   // setPrice(0);
                        // }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={0.5} className={classes.row}>
                    {item.id}
                  </Grid>
                  <Grid item xs={0.5} className={classes.row}>
                    <div>
                      <img
                        height={70}
                        width={70}
                        alt=""
                        src={item.PostImages[0].imagePath}
                      ></img>
                    </div>
                  </Grid>
                  <Grid item xs={1} className={classes.row}>
                    <div>{item.title}</div>
                  </Grid>
                  <Grid item xs={1} className={classes.row}>
                    <div>
                      {(Number(item.price) === -1 && "Đấu giá") ||
                        (Number(item.price) === 0 && "Miễn phí") ||
                        Number(item.price)}
                    </div>
                  </Grid>
                  <Grid item xs={1.7} className={classes.row}>
                    <div style={{ marginRight: 4 }}>{item.description}</div>
                  </Grid>
                  <Grid item xs={1} className={classes.row}>
                    <div>{item.PostCondition.status}</div>
                  </Grid>
                  <Grid item xs={0.5} className={classes.row}>
                    <div>{item.Origin.countryName}</div>
                  </Grid>
                  <Grid item xs={0.5} className={classes.row}>
                    <div>{item.Warranty.status}</div>
                  </Grid>
                  <Grid item xs={0.5} className={classes.row}>
                    <div>{item.Category.cateName}</div>
                  </Grid>
                  <Grid item xs={1.5} className={classes.row}>
                    <div>
                      {item.street +
                        ", " +
                        item.ward +
                        ", " +
                        item.district +
                        ", " +
                        item.province}
                    </div>
                  </Grid>
                  <Grid item xs={0.5} className={classes.row}>
                    <div>Số lượng like</div>
                  </Grid>
                  <Grid item xs={0.9} className={classes.row}>
                    <div>{item.PostActive.status}</div>
                  </Grid>
                  <Grid item xs={1} className={classes.row}>
                    <div>{item.userId}</div>
                  </Grid>
                  <Grid item xs={0.5} className={classes.row}>
                    <div>
                      <IconButton
                        id="fade-button"
                        aria-controls={open ? "fade-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(event) => {
                          handleClick(event, item.id);
                        }}
                      >
                        <MoreVertIcon></MoreVertIcon>
                      </IconButton>
                    </div>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </Paper>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>
            <EditIcon style={{ paddingRight: 8 }} />
            edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDeletePostByPostId(postId);
            }}
          >
            <DeleteForeverIcon style={{ paddingRight: 8, fill: "red" }} />
            <p style={{ color: "red" }}>Delete</p>
          </MenuItem>
        </Menu>
        <Modal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setIsModalDeleteSuccess(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {isModalDelete && (
              <Stack justifyContent="center" alignItems="center">
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
                      handleYesBtn();
                    }}
                  >
                    Có
                  </Button>
                  <Button
                    size="small"
                    // variant="outlined"
                    // color="secondary"
                    style={{
                      textTransform: "none",
                      backgroundColor: "#BDBDBD",
                      color: "white",
                    }}
                    onClick={() => {
                      handleNoBtn();
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: -32,
          // paddingBottom: 40,
          marginRight: 30,
        }}
      >
        <Pagination
          color="secondary"
          count={totalNumberPage}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default MyManagePost;
