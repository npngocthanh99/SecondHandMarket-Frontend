import {
  Button,
  Checkbox,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert, FormControl } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import location from "../../helps/location";

const useStyles = makeStyles((theme) => ({
  input_file_cus: {
    // backgroundColor: "#7b35ba",
    borderRadius: 4,
    padding: 8,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px ",
    width: 120,
    height: 120,
    textAlign: "center",
    // border: 4,
    border: "2px dashed #7b35ba",
  },

  image_frame_cus: {
    margin: 8,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px ",
  },
}));

function MyBodyEditPost() {
  // const { height, width } = useWindowDimensions();
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);
  const [codeProvince, setCodeProvince] = useState("-1");
  const [codeDistrict, setCodeDistrict] = useState("-1");
  const [countryArr, setCountryArr] = useState([]);
  const [warrantyArr, setWarrantyArr] = useState([]);
  const [categoryParentArr, setCategoryParentArr] = useState([]);
  const [categoryParentId, setCategoryParentId] = useState([]);
  const [categoryChildArr, setCategoryChildArr] = useState([]);
  const [statusCurrentProduct, setStatusCurrentProduct] = useState([]);
  const [isFreeProduct, setIsFreeProduct] = useState(false);
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  //edit posting
  const [currentParentCate, setCurrentParrentCate] = useState("");
  const [currentChildCate, setCurrentChildCate] = useState("");
  const [currentProductName, setCurrentProductName] = useState("");
  const [currentProductState, setCurrentProductState] = useState("");
  const [currentWarrantyStatus, setCurrentWarrantyStatus] = useState("");
  const [CurrentMadeIn, setCurrentMadeIn] = useState("");
  const [currentDes, setCurrentDes] = useState("");
  const [currentFree, setCurrentFree] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentProvince, setCurrentProvince] = useState("");
  const [currentDistrict, setCurrentDistrict] = useState("");
  const [currentWard, setCurrentWard] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");

  // const [cookies, setCookie, removeCookie] = useCookies();
  const classes = useStyles();

  //HANDLE SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      cateParentId: data.get("categoryParent"),
      cateId: data.get("categoryChild"),
      name: data.get("productName"),
      statusId: data.get("productState"),
      warrantyId: data.get("warranty"),
      madeInId: data.get("madeIn"),
      description: data.get("describe"),
      price: data.get("price"),
      province: data.get("province"),
      district: data.get("district"),
      ward: data.get("ward"),
      address: data.get("address"),
      free: data.get("freeProduct"),
      image: data.get("file"),
      images: document.querySelector("#file").files,

      // cookie: cookies.get('access_token')
    });

    try {
      const res = await axios.post(
        "/user/createPost",
        {
          cateId: data.get("categoryChild"),
          name: data.get("productName"),
          statusId: data.get("productState"),
          warrantyId: data.get("warranty"),
          madeInId: data.get("madeIn"),
          description: data.get("describe"),
          free: data.get("freeProduct"),
          price: data.get("price"),
          province: data.get("province"),
          district: data.get("district"),
          ward: data.get("ward"),
          address: data.get("address"),
          images: data.get("file"),
          // images: document.querySelector('#file').files[0],
          // images: images,
        },
        {
          headers: {
            Authorization: localStorage["access_token"],
            "Content-type": "multipart/form-data",
          },
        }
      );
      setErrMsg("");
      handleClick();
    } catch (error) {
      setErrMsg(error.response.data.message);
    }
  };

  const getDistrictByCodeProvince = (codeProvince) => {
    const districtData = location.district.filter((item) => {
      return item.parentCode === codeProvince;
    });
    setDistrictData(districtData);
  };

  const getWardByCodeDistrict = (codeDistrict) => {
    const wardData = location.ward.filter((item) => {
      return item.parentCode === codeDistrict;
    });
    setWardData(wardData);
  };

  const getAllCountry = async () => {
    let { data } = await axios.get("/common/allCountryName");
    setCountryArr(data.data);
  };

  const getAllWarrantyStatus = async () => {
    let { data } = await axios.get("/common/warrantyStatus");
    setWarrantyArr(data.data);
  };

  const getAllCategoryParrent = async () => {
    let { data } = await axios.get("/common/allCategoryParent");
    console.log(data.data);
    setCategoryParentArr(data.data);
  };

  const getAllCategoryChild = async () => {
    let { data } = await axios.get(
      `/common/categoryParent/${categoryParentId}/allCategoryChild`
    );
    setCategoryChildArr(data.data);
    console.log(data.data);
  };

  const getAllStatusCurrentProduct = async () => {
    let { data } = await axios.get("/common/allStatusCurrentProduct");
    setStatusCurrentProduct(data.data);
  };

  //CHANGE IMAGE

  const onImageChange = async (event) => {
    setImages([...event.currentTarget.files]);
  };

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  // edit post

  const { postId } = useParams();

  const getCurrentInfoPosting = async () => {
    try {
      const { data } = await axios.get(`/common/post/${postId}`);
      console.log("name::::", data.data);
      await getCateById(data.data.Category.cateParent);
      setCurrentChildCate(data.data.Category.cateName);
      setCurrentProductName(data.data.name);
      setCurrentProductState(data.data.StatusCurrentProduct.status);
      setCurrentWarrantyStatus(data.data.Warranty.status);
      setCurrentMadeIn(data.data.MadeIn.countryName);
      setCurrentDes(data.data.description);
      setCurrentPrice(data.data.price);
      setCurrentProvince(data.data.province);
      setCurrentDistrict(data.data.district);
      setCurrentWard(data.data.ward);
      setCurrentAddress(data.data.address);
    } catch (error) {
      console.log(error);
    }
  };

  const getCateById = async (id) => {
    try {
      console.log("id ::::", id);
      const { data } = await axios.get(`/common/category/${id}`);
      setCurrentParrentCate(data.data.cateName);
    } catch (error) {}
  };

  // useEffect(() => {
  //   getDistrictByCodeProvince(codeProvince);
  // }, [codeProvince]);

  // useEffect(() => {
  //   getWardByCodeDistrict(codeDistrict);
  // }, [codeDistrict]);

  // useEffect(() => {
  //   getAllCategoryChild();
  //   getCurrentInfoPosting()
  // }, [categoryParentId]);

  // useEffect(() => {
  // getAllCountry();
  // getAllWarrantyStatus();
  // getAllCategoryParrent();
  // getAllStatusCurrentProduct();
  // }, []);

  useLayoutEffect(() => {
    getAllCategoryParrent();
    // getAllStatusCurrentProduct()
    getCurrentInfoPosting();
  }, []);

  // show message cussess
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // handle choose category parent

  const handleChooseCateParent = async (id) => {
    const { data } = await axios.get(
      `/common/categoryParent/${id}/allCategoryChild`
    );
    setCategoryChildArr(data.data);
    console.log(data.data);
  };

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={8}>
          <div
            style={{
              backgroundColor: "#F1ECF5",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <form
              method="post"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <Grid container justifyContent="center">
                <Grid item xs={6}>
                  <div style={{ marginTop: 8 }}>
                    <label htmlFor="file">
                      <div className={classes.input_file_cus}>
                        {/* <AddAPhoto style={{ color: 'red' }}></AddAPhoto> */}
                        <img
                          alt=""
                          style={{ marginTop: 15 }}
                          src="https://img.icons8.com/color/48/000000/camera.png"
                        />
                        <p style={{ color: "#6f6c70" }}>Add Image</p>
                      </div>
                    </label>
                    <input
                      name="file"
                      accept="image/*"
                      type="file"
                      id="file"
                      hidden
                      multiple
                      onChange={onImageChange}
                    ></input>
                    <div
                      style={{
                        marginTop: 16,
                        display: "flex",
                        flexWrap: "wrap",
                        backgroundColor: "white",
                      }}
                    >
                      {imageURLS.map((imageSrc) => (
                        <div className={classes.image_frame_cus}>
                          <img
                            src={imageSrc}
                            alt="not fount"
                            width={120}
                            height={120}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ marginLeft: 40 }}>
                    <Stack spacing={1} justifyContent="center">
                      {/* CATEGORY PARENT */}

                      <TextField
                        SelectProps={{
                          MenuProps: { disableScrollLock: true },
                          renderValue: (value) => value,
                          color: "primary",
                        }}
                        name="categoryParent"
                        id="standard-size-small"
                        select
                        label="Category"
                        size="small"
                        variant="outlined"
                        // defaultValue={currentParentCate || 'hehehehehhe'}
                        // value={currentParentCate}
                        defaultValue={setCurrentParrentCate}
                      >
                        {categoryParentArr.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            <div
                              onClick={async () => {
                                handleChooseCateParent(item.id);
                                setCurrentParrentCate(item.cateName);
                              }}
                              style={{ color: "black" }}
                            >
                              {item.cateName}
                            </div>
                          </MenuItem>
                        ))}
                      </TextField>

                      {/* CATEGORY CHILD */}

                      <TextField
                        SelectProps={{
                          MenuProps: { disableScrollLock: true },
                          renderValue: (value) => value,
                        }}
                        name="categoryChild"
                        id="standard-size-small"
                        select
                        label="Category"
                        size="small"
                        variant="outlined"
                        value={currentChildCate}
                      >
                        {categoryChildArr.map((item) => (
                          <MenuItem key={item.id} value={item.cateName}>
                            <div style={{ color: "black" }}>
                              {item.cateName}
                            </div>
                          </MenuItem>
                        ))}
                      </TextField>

                      {/* PRODUCT NAME */}

                      <TextField
                        SelectProps={{ MenuProps: { disableScrollLock: true } }}
                        name="productName"
                        label="Product's name"
                        d="standard-size-small"
                        size="small"
                        variant="outlined"
                        value={currentProductName}
                      />

                      <TextField
                        SelectProps={{
                          MenuProps: { disableScrollLock: true },
                          renderValue: (value) => value,
                        }}
                        name="productState"
                        id="filled-select-currency"
                        select
                        label="Product'state"
                        size="small"
                        variant="outlined"
                        value={currentProductState}
                      >
                        {statusCurrentProduct.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            <div style={{ color: "black" }}>{item.status}</div>
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        SelectProps={{
                          MenuProps: { disableScrollLock: true },
                          renderValue: (value) => value,
                        }}
                        name="warranty"
                        id="filled-select-currency"
                        select
                        label="Warranty status"
                        size="small"
                        variant="outlined"
                        value={currentWarrantyStatus}
                      >
                        {warrantyArr.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            <div style={{ color: "black" }}>{item.status}</div>
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        SelectProps={{
                          MenuProps: { disableScrollLock: true },
                          renderValue: (value) => value,
                        }}
                        name="madeIn"
                        select
                        label="Made in: "
                        variant="outlined"
                        size="small"
                        value={CurrentMadeIn}
                      >
                        {countryArr.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            <div style={{ color: "black" }}>
                              {item.countryName}
                            </div>
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        name="describe"
                        id="outlined-multiline-static"
                        label="Describe"
                        multiline
                        minRows={4}
                        variant="outlined"
                        value={currentDes}
                      />

                      <Stack direction="row" alignContent="center">
                        <Checkbox
                          name="freeProduct"
                          size="small"
                          value={true}
                          color="secondary"
                          onChange={() => {
                            setIsFreeProduct(!isFreeProduct);
                          }}
                        />
                        <Typography style={{ paddingTop: 8, color: "black" }}>
                          Products for free giveaways{" "}
                        </Typography>
                      </Stack>

                      <TextField
                        name="price"
                        disabled={isFreeProduct}
                        label="Price *"
                        d="standard-size-small"
                        size="small"
                        variant="outlined"
                        value={currentPrice}
                      />

                      {/* TINH  */}

                      <TextField
                        SelectProps={{ MenuProps: { disableScrollLock: true } }}
                        name="province"
                        select
                        label="Pronvince"
                        size="small"
                        variant="outlined"
                        value={currentProvince}
                      >
                        {location.province.map((item) => (
                          <MenuItem key={item.name} value={item.name}>
                            <div
                              onClick={() => {
                                setCodeProvince(item.code);
                              }}
                              style={{ color: "black" }}
                            >
                              {item.name}
                            </div>
                          </MenuItem>
                        ))}
                      </TextField>

                      {/* HUYEN */}

                      <TextField
                        SelectProps={{
                          MenuProps: { disableScrollLock: true },
                          renderValue: (value) => value,
                        }}
                        name="district"
                        id="filled-select-currency"
                        select
                        label="District"
                        size="small"
                        variant="outlined"
                        value={currentDistrict}
                      >
                        {districtData.map((item) => (
                          <MenuItem key={item.name} value={item.name}>
                            <div
                              onClick={() => {
                                setCodeDistrict(item.code);
                              }}
                              style={{ color: "black" }}
                            >
                              {item.name}
                            </div>
                          </MenuItem>
                        ))}
                      </TextField>

                      {/* XA */}

                      <TextField
                        SelectProps={{
                          MenuProps: { disableScrollLock: true },
                          renderValue: (value) => value,
                        }}
                        name="ward"
                        select
                        label="ward"
                        size="small"
                        variant="outlined"
                        value={currentWard}
                      >
                        {wardData.map((item) => (
                          <MenuItem key={item.name} value={item.name}>
                            <div style={{ color: "black" }}>{item.name}</div>
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        name="address"
                        label="Address"
                        d="standard-size-small"
                        size="small"
                        variant="outlined"
                        value={currentAddress}
                      />
                      {errMsg && (
                        <Alert variant="filled" severity="error">
                          {errMsg}
                        </Alert>
                      )}
                      <Button
                        type="submit"
                        style={{ backgroundColor: "#7b35ba" }}
                        onClick={() => {}}
                      >
                        EDIT
                      </Button>
                      <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                      >
                        <Alert
                          style={{ backgroundColor: "#08DB3C" }}
                          onClose={handleClose}
                          severity="success"
                          sx={{ width: "100%" }}
                        >
                          Tạo bài viết thành công
                        </Alert>
                      </Snackbar>
                    </Stack>
                  </div>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyBodyEditPost;
