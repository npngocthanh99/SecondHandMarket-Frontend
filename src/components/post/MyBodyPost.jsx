import {
  Button,
  Checkbox,
  Grid,
  makeStyles,
  MenuItem,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { Alert, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import location from "../../helps/location";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useDispatch } from "react-redux";
import { getCurrentBidPrice } from "../../redux/currentBidPriceSice";
import { formatCash } from "../../helps/common";

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

function MyBodyPost() {
  // const { height, width } = useWindowDimensions();
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);
  const [countryArr, setCountryArr] = useState([]);
  const [warrantyArr, setWarrantyArr] = useState([]);
  const [categoryParentArr, setCategoryParentArr] = useState([]);
  const [categoryChildArr, setCategoryChildArr] = useState([]);
  const [statusCurrentProduct, setStatusCurrentProduct] = useState([]);
  const [isFreeProduct, setIsFreeProduct] = useState(false);
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [isBidProduct, setIsBidProduct] = useState(false);

  const dispatch = useDispatch();

  // formdata;
  const [cateParentId, setCateParentId] = useState("");
  const [cateId, setCateId] = useState("");
  const [name, setName] = useState("");
  const [statusId, setStatusId] = useState("");
  const [warrantyId, setWarrantyId] = useState("");
  const [madeInId, setMadeInId] = useState("");
  const [price, setPrice] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [street, setStreet] = useState("");
  // const [free, setFree] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [description, setDescription] = useState("");
  const [showCateInput, setShowCateInput] = useState(false);
  const [timer, setTimer] = React.useState(Date.now());

  const navigate = useNavigate();
  const classes = useStyles();

  const inputRef = useRef(null);

  //HANDLE SUBMIT
  const handleSubmit = async () => {
    let data = new FormData();

    data.append("cateParentId", cateId);
    data.append("cateId", cateId);
    data.append("name", name);
    data.append("statusId", statusId);
    data.append("warrantyId", warrantyId);
    data.append("madeInId", madeInId);
    data.append("description", description);
    data.append("province", province);
    data.append("district", district);
    data.append("ward", ward);
    data.append("address", street);
    data.append("startPrice", startPrice);
    data.append("bidEndTime", timer);
    data.append("isFree", isFreeProduct);
    data.append("isBid", isBidProduct);
    data.append("price", price);

    Array.from(images).forEach((item) => {
      data.append("images", item);
    });

    console.log("imagesss:::", images);

    try {
      const res = await axios.post("/user/createPost", data, {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });

      setErrMsg("");
      handleClick();
      console.log("ressss:::", res.data.data.id);
      // setTimeout(() => {
      //   navigate(`/post/${res.data.data.id}`);
      // }, 1000);
      dispatch(getCurrentBidPrice(false));
    } catch (error) {
      console.log("error::::", error.response.data);
      setErrMsg(error.response.data.message);
    }
  };

  const handleInputPrice = (e) => {
    // let _price = ;
    setPrice(e.target.value);
    console.log(e.target.value);
    console.log("input");
    console.log("price:::", price);

    // setInterval(() => {
    //   console.log("setInterval:::", e.target.value);
    //   setPrice(formatCash(String(price)));
    // }, 100);
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
    setCategoryParentArr(data.data);
  };

  const getAllCategoryChild = async (categoryParentId) => {
    let { data } = await axios.get(
      `/common/categoryParent/${categoryParentId}/allCategoryChild`
    );
    setCategoryChildArr(data.data);
    console.log("cateChild:::", data.data);
  };

  const getAllStatusCurrentProduct = async () => {
    let { data } = await axios.get("/common/allStatusCurrentProduct");
    console.log("PostCondition::::", data);
    setStatusCurrentProduct(data.data);
  };

  //CHANGE IMAGE

  const onImageChange = async (event) => {
    setImages([...event.target.files]);
  };

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  useEffect(() => {
    getAllCountry();
    getAllWarrantyStatus();
    getAllCategoryParrent();
    getAllStatusCurrentProduct();
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

  //  timeover for auction

  const handleChangeTimer = (timer) => {
    // const _timer = new Date(timer).getTime();
    console.log("timer:::", timer.$d);
    setTimer(timer.$d);
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
              borderRadius: 8,
            }}
          >
            {/* <form
              method="post"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            > */}
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
                      <p style={{ color: "#6f6c70", fontSize: 14 }}>
                        Thêm hình ảnh
                      </p>
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
                      <div key={imageSrc} className={classes.image_frame_cus}>
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
                    <TextField
                      SelectProps={{ MenuProps: { disableScrollLock: true } }}
                      name="cateParentId"
                      id="standard-size-small"
                      select
                      color="secondary"
                      label="Thể loại"
                      size="small"
                      variant="outlined"
                      onChange={(e) => {
                        setCateParentId(e.target.value);
                      }}
                    >
                      {categoryParentArr.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          <div
                            onClick={() => {
                              setCateId(item.id);
                              getAllCategoryChild(item.id);
                              setShowCateInput(true);
                            }}
                            style={{ color: "black" }}
                          >
                            {item.cateName}
                          </div>
                        </MenuItem>
                      ))}
                    </TextField>

                    {showCateInput && (
                      <TextField
                        SelectProps={{ MenuProps: { disableScrollLock: true } }}
                        name="cateId"
                        id="standard-size-small"
                        select
                        color="secondary"
                        // label=""
                        size="small"
                        variant="outlined"
                        // onChange={(e) => {
                        //   setCateId(e.target.value);
                        // }}
                      >
                        {categoryChildArr.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            <div
                              style={{ color: "black" }}
                              onClick={() => {
                                setCateId(item.id);
                              }}
                            >
                              {item.cateName}
                            </div>
                          </MenuItem>
                        ))}
                      </TextField>
                    )}

                    <TextField
                      SelectProps={{ MenuProps: { disableScrollLock: true } }}
                      name="name"
                      label="Tên sản phẩm"
                      d="standard-size-small"
                      color="secondary"
                      size="small"
                      variant="outlined"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />

                    <TextField
                      SelectProps={{ MenuProps: { disableScrollLock: true } }}
                      name="statusId"
                      id="filled-select-currency"
                      select
                      label="Trạng thái sản phẩm"
                      color="secondary"
                      size="small"
                      variant="outlined"
                      onChange={(e) => {
                        setStatusId(e.target.value);
                      }}
                    >
                      {statusCurrentProduct.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          <div
                            style={{ color: "black" }}
                            onClick={() => {
                              setStatusId(item.id);
                            }}
                          >
                            {item.status}
                          </div>
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      SelectProps={{ MenuProps: { disableScrollLock: true } }}
                      name="warrantyId"
                      id="filled-select-currency"
                      select
                      color="secondary"
                      label="Bảo hành"
                      size="small"
                      variant="outlined"
                      onChange={(e) => {
                        setWarrantyId(e.target.value);
                      }}
                    >
                      {warrantyArr.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          <div
                            style={{ color: "black" }}
                            onClick={() => {
                              setWarrantyId(item.id);
                            }}
                          >
                            {item.status}
                          </div>
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      SelectProps={{ MenuProps: { disableScrollLock: true } }}
                      name="madeInId"
                      color="secondary"
                      select
                      label="Sản xuất tại"
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        setMadeInId(e.target.value);
                      }}
                    >
                      {countryArr.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          <div
                            style={{ color: "black" }}
                            onClick={() => {
                              setMadeInId(item.id);
                            }}
                          >
                            {item.countryName}
                          </div>
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      color="secondary"
                      name="description"
                      id="outlined-multiline-static"
                      label="Mô tả"
                      multiline
                      minRows={4}
                      variant="outlined"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />

                    <Stack direction="row" alignContent="center">
                      <Checkbox
                        checked={isFreeProduct}
                        style={{
                          color: "#7b35ba",
                        }}
                        name="free"
                        size="small"
                        value={true}
                        color="secondary"
                        onChange={() => {
                          setIsFreeProduct(!isFreeProduct);
                          setIsBidProduct(false);
                          // setPrice(0);
                        }}
                      />
                      <Typography style={{ paddingTop: 8, color: "black" }}>
                        Sản phẩm dùng để cho tặng{" "}
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignContent="center">
                      <Checkbox
                        checked={isBidProduct}
                        style={{
                          color: "#7b35ba",
                        }}
                        name="bidOption"
                        size="small"
                        value={true}
                        color="secondary"
                        onChange={() => {
                          setIsBidProduct(!isBidProduct);
                          setIsFreeProduct(false);
                          setPrice(-1);
                        }}
                      />
                      <Typography style={{ paddingTop: 8, color: "black" }}>
                        Đấu giá{" "}
                      </Typography>
                    </Stack>

                    {/* timeover */}

                    {isBidProduct ? (
                      <>
                        <div style={{ justifyContent: "center" }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              label="Thời gian kết thúc đấu giá"
                              value={timer}
                              onChange={handleChangeTimer}
                              renderInput={(params) => (
                                <TextField {...params} color="secondary" />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                        <TextField
                          color="secondary"
                          name="startPrice"
                          disabled={!isBidProduct}
                          label="Giá khởi điểm *"
                          d="standard-size-small"
                          size="small"
                          variant="outlined"
                          onChange={(e) => {
                            setStartPrice(e.target.value);
                          }}
                        />
                      </>
                    ) : (
                      <TextField
                        // value={price}
                        color="secondary"
                        name="price"
                        disabled={isFreeProduct}
                        label="Giá *"
                        d="standard-size-small"
                        size="small"
                        variant="outlined"
                        onChange={(e) => {
                          // setPrice(e.target.value);
                          handleInputPrice(e);
                        }}
                      />
                    )}

                    {/* TINH  */}

                    <TextField
                      SelectProps={{ MenuProps: { disableScrollLock: true } }}
                      color="secondary"
                      name="province"
                      select
                      label="Tỉnh/Thành phố"
                      size="small"
                      variant="outlined"
                      onChange={(e) => {
                        setProvince(e.target.value);
                      }}
                    >
                      {location.province.map((item) => (
                        <MenuItem key={item.name} value={item.name}>
                          <div
                            onClick={() => {
                              getDistrictByCodeProvince(item.code);
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
                      SelectProps={{ MenuProps: { disableScrollLock: true } }}
                      name="district"
                      id="filled-select-currency"
                      select
                      color="secondary"
                      label="Huyện/Quận"
                      size="small"
                      variant="outlined"
                      onChange={(e) => {
                        setDistrict(e.target.value);
                      }}
                    >
                      {districtData.map((item) => (
                        <MenuItem key={item.name} value={item.name}>
                          <div
                            onClick={() => {
                              getWardByCodeDistrict(item.code);
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
                      SelectProps={{ MenuProps: { disableScrollLock: true } }}
                      name="ward"
                      color="secondary"
                      select
                      label="Xã/Phường"
                      size="small"
                      variant="outlined"
                      onChange={(e) => {
                        setWard(e.target.value);
                      }}
                    >
                      {wardData.map((item) => (
                        <MenuItem key={item.name} value={item.name}>
                          <div style={{ color: "black" }}>{item.name}</div>
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      name="street"
                      color="secondary"
                      label="Đường"
                      d="standard-size-small"
                      size="small"
                      variant="outlined"
                      onChange={(e) => {
                        setStreet(e.target.value);
                      }}
                    />
                    {errMsg && (
                      <Alert variant="filled" severity="error">
                        {errMsg}
                      </Alert>
                    )}
                    <Button
                      type="submit"
                      style={{ backgroundColor: "#7b35ba" }}
                      onClick={handleSubmit}
                    >
                      <p style={{ color: "white" }}>Tạo bài viết</p>
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
            {/* </form> */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyBodyPost;
