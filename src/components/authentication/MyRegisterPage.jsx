import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link as Linkr, Navigate } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Alert } from "@mui/material";
// import { Routes, Route, Outlet, Link } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function MyRegister() {
  const [errMsg, setErrMsg] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get("email"),
        password: data.get("password"),
        confirmPassword: data.get("confirmPassword"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
      });

      let res = await axios.post("/auth/register", {
        email: data.get("email"),
        password: data.get("password"),
        confirmPassword: data.get("confirmPassword"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
      });

      console.log("res::::::", res);
      if (res) {
        navigate("/sendOTP");
      }
    } catch (error) {
      console.log(
        "error_handleSubmitRegisterAccount::::",
        error.response.data.message
      );
      setErrMsg(error.response.data.message);
    }
  };

  const checkIsLogin = async () => {
    console.log("localStorage ", localStorage["access_token"]);

    if (localStorage["access_token"] !== undefined) {
      navigate("/");
    } else {
      navigate("/register");
    }
  };

  React.useEffect(() => {
    checkIsLogin();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký
          </Typography>
          {errMsg !== "" && (
            <Alert variant="filled" severity="error">
              {errMsg}
            </Alert>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Họ"
                  autoFocus
                  onChange={() => {
                    setErrMsg("");
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  required
                  fullWidth
                  id="lastName"
                  label="Tên"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={() => {
                    setErrMsg("");
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  required
                  fullWidth
                  id="email"
                  label="Địa chỉ email"
                  name="email"
                  autoComplete="email"
                  onChange={() => {
                    setErrMsg("");
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={() => {
                    setErrMsg("");
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Xác nhận mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="new-confirmPassword"
                  onChange={() => {
                    setErrMsg("");
                  }}
                />
              </Grid>
              {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
            </Grid>
            <Button
              // href='/sendOTP'
              // component={Linkr} to="/sendOTP"
              variant="contained"
              // color="primary"
              type="submit"
              fullWidth
              style={{
                marginTop: 12,
                marginBottom: 8,
                textTransform: "none",
                backgroundColor: "#7b35ba",
              }}
            >
              Gửi OTP
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <a
                  href=""
                  onClick={() => {
                    navigate("/login");
                  }}
                  style={{ color: "gray", fontSize: 12 }}
                >
                  Bạn đã có tài khoản? Đăng nhập
                </a>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
