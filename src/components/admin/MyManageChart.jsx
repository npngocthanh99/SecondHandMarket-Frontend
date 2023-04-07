import { Grid, Paper } from "@mui/material";
import React from "react";
import MyBidPostingChart from "./MyBidPostingChart";
import MyPostingChart from "./MyPostingChart";
import MyUserChart from "./MyUserChart";

function MyManageChart() {
  return (
    <div style={{ margin: 12, marginBottom: 40 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper style={{ height: 500 }}>
            <p
              style={{
                color: "#7b35ba",
                fontSize: 24,
                marginBottom: 30,
                paddingTop: 14,
                marginLeft: 14,
              }}
            >
              Tài khoản
            </p>
            <MyUserChart />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ height: 500 }}>
            {" "}
            <p
              style={{
                color: "#7b35ba",
                fontSize: 24,
                marginBottom: 30,
                paddingTop: 14,
                marginLeft: 14,
              }}
            >
              Bài viết
            </p>
            <MyPostingChart />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ height: 500 }}>
            <p
              style={{
                color: "#7b35ba",
                fontSize: 24,
                marginBottom: 30,
                paddingTop: 14,
                marginLeft: 14,
              }}
            >
              Bài viết đấu giá
            </p>
            <MyBidPostingChart />
          </Paper>
        </Grid>
        {/* <Grid item xs={6}>
          <Paper style={{ height: 500 }}>
            <p
              style={{
                color: "#7b35ba",
                fontSize: 24,
                marginBottom: 30,
                paddingTop: 14,
                marginLeft: 14,
              }}
            >
              Bài viết
            </p>
            <MyPostingChart />
          </Paper>
        </Grid> */}
      </Grid>
    </div>
  );
}

export default MyManageChart;
