import OtpInput from "react-otp-input";
// import OTPInput, { ResendOTP } from "otp-input-react";
// import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useEffect, useState } from "react";
import axios from "axios";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

// import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Box, Modal, Stack } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  grid: {
    backgroundColor: "grey",
    height: "50vh",
    textAlign: "center",
  },
  avatar: {
    padding: 12,
    borderRadius: "50%",
    backgroundColor: "#7b35ba",
    fill: "white",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function MyOTPInputPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const theme = useTheme();

  const navigate = useNavigate();

  const [OTP, setOTP] = useState();

  const sendOTP = async () => {
    try {
      const res = await axios.post("http://localhost:8080/auth/sent_otp", {
        otp: OTP,
      });
      if (res) {
        setOpen(true);
      }
    } catch (error) {}
    // if (res) {
    //   navigate("/login");
    //   alert("dang ky thanh cong");
    // }
  };

  useEffect(() => {
    console.log("The current value of the input: ", OTP);
  }, [OTP]);
  return (
    <div>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid
            container
            style={{ backgroundColor: "white" }}
            className={classes.grid}
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item container justifyContent="center">
              <Grid item container alignItems="center" direction="column">
                <Grid item>
                  <div
                    style={{
                      backgroundColor: "#7b35ba",
                      borderRadius: "50%",
                      width: 50,
                      height: 50,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <VpnKeyIcon
                      // className={classes.avatar}
                      style={{ fill: "white" }}
                    >
                      {/* <LockOutlinedIcon /> */}
                    </VpnKeyIcon>
                  </div>
                </Grid>
                <Grid item>
                  <Typography component="h1" variant="h5">
                    Mã xác thực
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} textalign="center">
              <Paper elevation={0}>
                <Typography variant="h6">
                  Bạn hãy nhập mã xác thực được gửi vào email của bạn
                </Typography>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
            >
              <Grid item spacing={3} container justifyContent="center">
                <OtpInput
                  onChange={setOTP}
                  value={OTP}
                  separator={
                    <span>
                      <strong>.</strong>
                    </span>
                  }
                  isInputNum={true}
                  numInputs={6}
                  inputStyle={{
                    width: "3rem",
                    height: "3rem",
                    margin: "0 1rem",
                    fontSize: "2rem",
                    borderRadius: 4,
                    border: "1px solid rgba(0,0,0,0.3)",
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    sendOTP();
                  }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  style={{ textTransform: "none", backgroundColor: "#7b35ba" }}
                >
                  Xác thực
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack
                direction="column"
                spacing={2}
                justifyContent="center"
                alignContent="center"
                alignItems="center"
              >
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Đăng ký tài khoản thành công!
                </Typography>
                <Button
                  style={{
                    width: 50,
                    paddingTop: 8,
                    backgroundColor: "#7b35ba",
                    color: "white",
                  }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  OK
                </Button>
              </Stack>
            </Box>
          </Modal>
        </div>
      </Container>
    </div>
  );
}
