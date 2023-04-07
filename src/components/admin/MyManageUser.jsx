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
  getUsers,
  removeUser,
  searchUserByLastname as searchUser,
} from "../../API/user_api";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { paginate } from "../../helps/common";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    height: 50,
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
  // border: "1px solid #000",
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
};

function MyManageUser() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [listUser, setListUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalDeleteSuccess, setIsModalDeleteSuccess] = useState(false);
  const [userId, setUserId] = useState("");
  const [page, setPage] = React.useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(0);

  const open = Boolean(anchorEl);
  const handleClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setUserId(userId);
    console.log("userId:::", userId);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // paging
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const getListUserInfo = async () => {
    setListUser([]);
    const { list, totalNumberPage } = paginate(await getUsers(), 11, page);
    setTotalNumberPage(totalNumberPage);
    setListUser(list);
  };

  const handleDeleteUserById = async (userId) => {
    handleClose();
    setOpenModal(true);
    setIsModalDelete(true);
    // setUserId(userId);
  };

  const handleYesBtn = async () => {
    setOpenModal(true);
    setIsModalDelete(false);
    const isSuccess = await removeUser(userId);
    if (Number(isSuccess) === 1) {
      await getListUserInfo();
      setIsModalDeleteSuccess(true);
    } else {
      console.log("xoa khong thanh cong");
    }
  };

  const handleNoBtn = () => {
    setOpenModal(false);
  };

  const searchUserByLastname = async (lastName) => {
    if (!lastName) {
      // setListUser(await getUsers());
      await getListUserInfo();
      return;
    }
    setListUser(await searchUser(lastName));
  };

  useEffect(() => {
    getListUserInfo();
  }, [page]);

  return (
    <div>
      <div style={{ margin: 40, fontSize: 14, overflow: "auto" }}>
        <div></div>
        {/* <div style={{ margin: 20 }}> */}
        <Paper style={{ borderRadius: 12, width: 2000 }}>
          <Grid container>
            <Grid item xs={12} className={classes.row}>
              <TextField
                style={{ margin: 20 }}
                size="small"
                color="secondary"
                label="Tìm kiếm"
                variant="outlined"
                onChange={(e) => {
                  searchUserByLastname(e.target.value);
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
            <Grid item xs={1.5} className={classes.row}>
              userId
            </Grid>
            <Grid item xs={1} className={classes.row}>
              <div style={{ marginLeft: 8 }}>First name</div>
            </Grid>
            <Grid item xs={1} className={classes.row}>
              <div>Last name</div>
            </Grid>
            <Grid item xs={1} className={classes.row}>
              <div>Phone</div>
            </Grid>
            <Grid item xs={1.5} className={classes.row}>
              <div>mail</div>
            </Grid>
            <Grid item xs={2.5} className={classes.row}>
              <div>Address</div>
            </Grid>
            <Grid
              item
              xs={1.1}
              className={classes.row}
              style={{ paddingLeft: 4 }}
            >
              <div>Star</div>
            </Grid>
            <Grid item xs={1} className={classes.row}>
              <div>Status</div>
            </Grid>
            <Grid item xs={1} className={classes.row}>
              <div>Action</div>
            </Grid>
          </Grid>
          {listUser.map((item) => {
            return (
              <div key={item.userId}>
                <Divider />
                <Grid container key={item.userId}>
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
                  <Grid tiem xs={1.5} className={classes.row}>
                    {item.userId}
                  </Grid>
                  <Grid item xs={1} className={classes.row}>
                    <div style={{ marginLeft: 8 }}>{item.firstName}</div>
                  </Grid>
                  <Grid item xs={1} className={classes.row}>
                    <div>{item.lastName}</div>
                  </Grid>
                  <Grid item xs={1} className={classes.row}>
                    <div>{item.phone}</div>
                  </Grid>
                  <Grid item xs={1.5} className={classes.row}>
                    <div>{item.email}</div>
                  </Grid>
                  <Grid item xs={2.5} className={classes.row} style={{}}>
                    <div>{item.address}</div>
                  </Grid>
                  <Grid
                    item
                    xs={1.1}
                    className={classes.row}
                    style={{ paddingLeft: 4 }}
                  >
                    <div>
                      <Rating
                        name="read-only"
                        value={item.starRating}
                        size="small"
                        readOnly
                      />
                    </div>
                  </Grid>
                  <Grid item xs={1} className={classes.row}>
                    {item.UserStatus.status === "Active" && (
                      <div
                        style={{
                          padding: 8,
                          color: "#229A16",
                          backgroundColor: "#E4F8DD",
                          borderRadius: 8,
                        }}
                      >
                        Active
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={1} className={classes.row}>
                    <div>
                      <IconButton
                        id="fade-button"
                        aria-controls={open ? "fade-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(event) => {
                          handleClick(event, item.userId);
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
          // onChange={(e) => {
          //   setUserId(item.id);
          //   console.log("userId:::", item.id);
          // }}
        >
          <MenuItem onClick={handleClose}>
            <EditIcon style={{ paddingRight: 8 }} />
            edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDeleteUserById(userId);
            }}
            // value={item.userId}
          >
            <DeleteForeverIcon style={{ paddingRight: 8, fill: "red" }} />
            <p style={{ color: "red" }}>Delete</p>
          </MenuItem>
          {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
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
                  Bạn có chắc muốn xoá người dùng này!
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
                    Xoá người dùng thành công!
                  </Typography>
                </Stack>
              </div>
            )}
          </Box>
        </Modal>
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}
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

export default MyManageUser;
