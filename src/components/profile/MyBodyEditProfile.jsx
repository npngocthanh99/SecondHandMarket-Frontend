import { Button, Grid, IconButton, TextField } from "@material-ui/core";
import { Alert, Snackbar } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";

function MyBodyEditProfile() {
  const [image, setImage] = useState(
    "https://ionicframework.com/docs/img/demos/avatar.svg"
  );
  const [userInfo, setUserInfo] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resMesg, setResMesg] = useState("");
  const [colorResMesg, setColorResMesg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      image: data.get("file"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      address: data.get("address"),
      changePassword: data.get("changePassword"),
    });
    const userInfo = {
      image: data.get("file"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      address: data.get("address"),
      changePassword: data.get("changePassword"),
    };
    await updateUserInfo(userInfo);
  };

  const handleChangeImg = (event) => {
    console.log("change image:::", event);
    console.log(event.target.files);
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  // GET USERINFO
  const getUserInfo = async () => {
    try {
      const { data } = await axios.get("/user/userInfo", {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      console.log("userInfo:::", data.data);
      setUserInfo(data.data);
      setFirstName(data.data.firstName);
      setLastName(data.data.lastName);
      setEmail(data.data.email);
      setPhone(data.data.phone);
      setAddress(data.data.address);
      setImage(data.data.avatarImg);
    } catch (error) {
      console.log("erorr get user info ::: ", error);
    }
  };

  const updateUserInfo = async (userInfo) => {
    try {
      const data = await axios.put("/user/updateProfile", userInfo, {
        headers: {
          Authorization: localStorage["access_token"],
          "Content-type": "multipart/form-data",
        },
      });
      console.log("data res:::", data.data.message);
      setResMesg(data.data.message);
      setColorResMesg("#08DB3C");
      handleClick();
      window.location.reload(false);
    } catch (error) {
      console.log("error update user Info :::", error.response.data.message);
      setResMesg(error.response.data.message);
      setColorResMesg("#EEDC62");
      handleClick();
    }
  };

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

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Grid container justifyContent="center" style={{ minHeight: "70vh" }}>
      <Grid
        item
        xs={4}
        style={{ backgroundColor: "#F1ECF5", borderRadius: 12 }}
      >
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <div style={{ margin: 8, marginTop: 24 }}>
                <Stack
                  spacing={3}
                  justifyContent="center"
                  justifyItems="center"
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ position: "relative" }}>
                      <label htmlFor="file" style={{ cursor: "pointer" }}>
                        <img
                          alt=""
                          src={
                            image ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                          }
                          width={120}
                          height={120}
                          style={{
                            borderRadius: "50%",
                            // border: " 1px solid #7b35ba",
                          }}
                        ></img>
                      </label>
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        name="file"
                        id="file"
                        onChange={(event) => {
                          handleChangeImg(event);
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 5,
                          right: 5,
                          zIndex: 100,
                        }}
                      >
                        <PhotoCamera style={{ fill: "#7b35ba" }} />
                      </div>
                    </div>
                  </div>
                  <Stack direction="row" spacing={1}>
                    <TextField
                      SelectProps={{ MenuProps: { disableScrollLock: true } }}
                      name="firstName"
                      label="Họ"
                      d="standard-size-small"
                      size="small"
                      variant="outlined"
                      fullWidth
                      value={firstName}
                      onChange={(event) => {
                        setFirstName(event.target.value);
                      }}
                    />
                    <TextField
                      SelectProps={{ MenuProps: { disableScrollLock: true } }}
                      name="lastName"
                      label="Tên"
                      d="standard-size-small"
                      size="small"
                      variant="outlined"
                      fullWidth
                      value={lastName}
                      onChange={(event) => {
                        setLastName(event.target.value);
                      }}
                    />
                  </Stack>
                  <TextField
                    name="email"
                    label="Email"
                    d="standard-size-small"
                    size="small"
                    variant="outlined"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  <TextField
                    name="phone"
                    label="Số điện thoại"
                    d="standard-size-small"
                    size="small"
                    variant="outlined"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                  />
                  <TextField
                    name="address"
                    label="Địa chỉ"
                    d="standard-size-small"
                    size="small"
                    variant="outlined"
                    value={address}
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                  />
                  <TextField
                    name="changePassword"
                    label="Đổi mật khẩu"
                    d="standard-size-small"
                    size="small"
                    variant="outlined"
                    type="password"
                  />
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#7b35ba",
                      textTransform: "none",
                      color: "white",
                    }}
                    onClick={() => {}}
                  >
                    Gửi
                  </Button>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      style={{ backgroundColor: colorResMesg }}
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      {/* {${err} | Tạo bài viết thành công} */}
                      {resMesg}
                    </Alert>
                  </Snackbar>
                </Stack>
              </div>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default MyBodyEditProfile;
