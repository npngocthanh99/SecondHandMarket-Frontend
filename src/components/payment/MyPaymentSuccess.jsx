import { Grid, Paper } from "@material-ui/core";
import { Stack } from "@mui/system";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MyPaymentSuccess() {
  const getTransactionId = async () => {
    try {
    } catch (error) {}
  };

  const navigate = useNavigate();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={4} style={{ minHeight: "70vh" }}>
        <Paper style={{ backgroundColor: "#F1ECF5" }}>
          <Stack
            direction="column"
            justifyContent="center"
            justifyItems="center"
            alignItems="center"
            padding={12}
            spacing={3}
          >
            <CheckCircleIcon
              style={{ fill: "green", width: 150, height: 150 }}
            />
            <p style={{ color: "green", fontSize: 30 }}>
              Thanh toán thành công!
            </p>
            <Stack direction="row" alignItems="flex-end">
              <p style={{ color: "green", fontSize: 20, paddingRight: 8 }}>
                Mã giao dịch:{" "}
              </p>
              <p>JXWA7LY5KL57J</p>
            </Stack>
            <Button
              size="small"
              style={{
                backgroundColor: "#7b35ba",
                textTransform: "none",
                color: "white",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Tiếp tục mua hàng
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MyPaymentSuccess;
