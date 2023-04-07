import { makeStyles } from "@material-ui/core";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addCategory,
  getCategoryById,
  getParentCategories,
  removeCateById,
  updateCategory,
} from "../../API/user_api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Stack } from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DoneIcon from "@mui/icons-material/Done";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    height: 74,
    alignContent: "center",
    borderRadius: 8,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "white",
  // border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

function MyManageCategory() {
  const classes = useStyles();
  const [listCate, setListCate] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [listchildCate, setListChildCate] = useState([]);
  const [image, setImage] = useState();
  const [parentCateId, setParentCateId] = useState("");
  const [cateName, setCateName] = useState("");
  const [file, setFile] = useState();
  const [msg, setMsg] = useState();
  const [openMoal, setOpenModal] = React.useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [cateId, setCateId] = useState("");
  const [isSuccessDelete, setIsSuccessDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAddParentCate, setIsAddParentCate] = useState(false);
  const [isDeleteParentCate, setIsDeleteParentCate] = useState(false);
  const [isEditParentCate, setIsEditParentCate] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = async (event, parentCateId) => {
    setAnchorEl(event.currentTarget);
    setListChildCate(await getParentCategories(parentCateId));
    setParentCateId(parentCateId);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //modal
  // const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenModalAdd(false);
    setOpenModalDelete(false);
    setIsSuccessDelete(false);
  };

  const handleBtnAddCate = async () => {
    try {
      if (cateName === "" || !file) {
        setMsg("Phải điền đầy đủ thông tin");
        return;
      }
      if (isAddParentCate) {
        let formData = new FormData();
        formData.append("cateName", cateName);
        formData.append("cateParent", 0);
        formData.append("image", file);
        const isSuccess = await addCategory(formData);
        if (isSuccess) {
          setListCate(await getParentCategories(0));
          setFile(false);
          setImage();
          setCateName("");
          setMsg(false);
          setOpenModal(false);
          setOpenModalAdd(false);
          setIsAddParentCate(false);
        }
      } else {
        let formData = new FormData();
        formData.append("cateName", cateName);
        formData.append("cateParent", parentCateId);
        formData.append("image", file);
        const isSuccess = await addCategory(formData);
        if (isSuccess) {
          setListChildCate(await getParentCategories(parentCateId));
          setFile(false);
          setImage();
          setCateName("");
          setMsg(false);
          setOpenModal(false);
          setOpenModalAdd(false);
        }
      }
    } catch (error) {}
  };

  const removeCategoryById = async (id) => {
    try {
      const isSuccess = await removeCateById(id);
      if (isSuccess) {
        isDeleteParentCate
          ? setListCate(await getParentCategories(0))
          : setListChildCate(await getParentCategories(parentCateId));
        setOpenModalDelete(false);
        setIsSuccessDelete(true);
      }
    } catch (error) {}
  };

  const handleChangeImg = (event) => {
    setMsg(false);
    setFile(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const getCategories = async () => {
    setListCate(await getParentCategories(0));
    try {
    } catch (error) {}
  };

  const getCategoyById = async (id) => {
    try {
      const data = await getCategoryById(id);
      if (data) {
        setIsEdit(true);
        setCateName(data.cateName);
        setImage(data.cateLogoImg);
        setFile(data.cateLogoImg);
        setCateId(id);
        setOpenModal(true);
        setOpenModalAdd(true);
        setMsg("");
      }
    } catch (error) {}
  };

  const handleBtnEditCate = async () => {
    try {
      if (cateName === "") {
        setMsg("Phải điền đầy đủ thông tin");
        return;
      }

      let formData = new FormData();
      formData.append("cateName", cateName);
      formData.append("id", cateId);
      formData.append("image", file);
      console.log({ cateName, image, cateId });

      const isSuccess = await updateCategory(formData);
      if (isSuccess) {
        console.log("cap nhat thanh cong::::");
        if (isEditParentCate) {
          setListCate(await getParentCategories(0));
        } else {
          setListChildCate(await getParentCategories(parentCateId));
        }
        setCateName("");
        setImage("");
        setIsEditParentCate(false);
        setOpenModal(false);
        setOpenModalAdd(false);
        setIsEdit(false);
      }
    } catch (error) {}
  };

  // const handleAddParentCate = async () => {
  //   try {
  //     if (cateName === "" || !file) {
  //       setMsg("Phải điền đầy đủ thông tin");
  //       return;
  //     }
  //     setOpenModal(true);
  //     setOpenModalAdd(true);
  //     setMsg(false);
  //     setOpenModalDelete(false);
  //     setIsEdit(false);
  //     setIsSuccessDelete(false);
  //   } catch (error) {}
  // };

  useEffect(() => {
    getCategories();
    console.log("reload");
  }, []);

  return (
    <div
      style={{
        marginLeft: 40,
        marginTop: 40,
        marginBottom: 60,
        // overflow: "auto",
        width: 650,
        fontSize: 14,
      }}
    >
      <Paper style={{ borderRadius: 12 }}>
        <Grid container>
          <Grid item xs={1} style={{ marginLeft: 16 }} className={classes.row}>
            ID
          </Grid>
          <Grid item xs={2} className={classes.row}>
            Hình ảnh
          </Grid>
          <Grid item xs={6.8} className={classes.row}>
            Tên thể loại
          </Grid>
          <Grid item xs={1} className={classes.row}>
            <IconButton
              onClick={() => {
                setIsAddParentCate(true);
                setMsg("");
                setOpenModal(true);
                setOpenModalAdd(true);
                setIsEdit(false);
                setParentCateId(0);
                setCateName("");
                setImage("");
              }}
            >
              <AddIcon />
              <p style={{ fontSize: 14 }}>Thêm</p>
            </IconButton>
          </Grid>
        </Grid>
        {listCate.map((item) => {
          return (
            <div>
              <Divider />
              <Grid container>
                <Grid
                  item
                  xs={1}
                  style={{ marginLeft: 16 }}
                  className={classes.row}
                >
                  {item.id}
                </Grid>
                <Grid item xs={2} className={classes.row}>
                  <img
                    alt=""
                    src={item.cateLogoImg}
                    width={70}
                    height={70}
                  ></img>
                </Grid>
                <Grid item xs={6.3} className={classes.row}>
                  {item.cateName}
                </Grid>
                <Grid item xs={1.2} className={classes.row}>
                  <IconButton
                    onClick={() => {
                      getCategoyById(item.id);
                      setIsEditParentCate(true);
                      // setCateName("");
                      // setImage("");
                      // setCateId("");
                    }}
                  >
                    <EditIcon style={{ fill: "#FFD600" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setOpenModal(true);
                      setOpenModalDelete(true);
                      setCateId(item.id);
                      setIsDeleteParentCate(true);
                    }}
                  >
                    <ClearIcon style={{ fill: "red" }} />
                  </IconButton>
                  <IconButton
                    onClick={(event) => {
                      handleClick(event, item.id);
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          );
        })}
      </Paper>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {listchildCate.map((item) => {
          return (
            <>
              <MenuItem key={item.id}>
                <Stack direction="row" spacing={3}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <p>{item.id}</p>
                    <img
                      alt=""
                      width={40}
                      height={40}
                      src={item.cateLogoImg}
                    ></img>
                    <p>{item.cateName}</p>
                  </Stack>
                  <Stack direction="row">
                    <IconButton
                      onClick={() => {
                        getCategoyById(item.id);
                      }}
                    >
                      <EditIcon fontSize="small" style={{ fill: "#FFD600" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setOpenModal(true);
                        setOpenModalDelete(true);
                        setCateId(item.id);
                      }}
                    >
                      <ClearIcon fontSize="small" style={{ fill: "red" }} />
                    </IconButton>
                  </Stack>
                </Stack>
              </MenuItem>
              <Divider />
            </>
          );
        })}
        <MenuItem
          onClick={() => {
            setMsg("");
            setOpenModal(true);
            setOpenModalAdd(true);
            setIsEdit(false);
          }}
        >
          <AddIcon />
          Thêm thể loại
        </MenuItem>
      </Menu>
      <div>
        <Modal open={openMoal} onClose={handleCloseModal}>
          <Box sx={style}>
            {openModalAdd && (
              <Stack direction="column">
                <Stack direction="row" spacing={2} alignItems="center">
                  <div style={{ position: "relative" }}>
                    <label htmlFor="file" style={{ cursor: "pointer" }}>
                      <img
                        alt=""
                        src={
                          image ||
                          "https://static.thenounproject.com/png/187803-200.png"
                        }
                        width={40}
                        height={40}
                        // style={{ borderRadius: "50%" }}
                      ></img>
                    </label>
                    <input
                      accept="image/*"
                      type="file"
                      id="file"
                      hidden
                      // multiple
                      onChange={(event) => {
                        handleChangeImg(event);
                      }}
                    />
                  </div>
                  <div style={{ width: 300 }}>
                    <TextField
                      value={cateName}
                      fullWidth
                      color="secondary"
                      label="Thêm thể loại"
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        setCateName(e.target.value);
                        setMsg(false);
                      }}
                    />
                  </div>

                  <Button
                    style={{
                      textTransform: "none",
                      backgroundColor: "#7b35ba",
                      color: "white",
                    }}
                    size="small"
                    onClick={async () => {
                      // isEdit ? handleBtnEditCate : handleBtnAddCate
                      if (isEdit) {
                        handleBtnEditCate();
                      } else {
                        handleBtnAddCate();
                      }
                    }}
                  >
                    {isEdit ? "Sửa" : "Thêm"}
                  </Button>
                </Stack>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ color: "red", fontSize: 14 }}> {msg}</p>
                </div>
              </Stack>
            )}
            {openModalDelete && (
              <Stack justifyContent="center" spacing={2}>
                <p>Bạn có muốn xoá thể loại này?</p>
                <Stack direction="row" justifyContent="center" spacing={2}>
                  <IconButton
                    onClick={() => {
                      removeCategoryById(cateId);
                      setIsDeleteParentCate(false);
                    }}
                  >
                    <DoneIcon style={{ fill: "green" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setOpenModal(false);
                      setOpenModalDelete(false);
                    }}
                  >
                    <ClearIcon style={{ fill: "red" }} />
                  </IconButton>
                </Stack>
              </Stack>
            )}
            {isSuccessDelete && (
              <Stack
                justifyContent="center"
                spacing={2}
                alignItems="center"
                alignContent="center"
                justifyItems="center"
              >
                <DoneIcon fontSize="large" style={{ fill: "green" }} />
                <p>Xoá thành công! </p>
              </Stack>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default MyManageCategory;
