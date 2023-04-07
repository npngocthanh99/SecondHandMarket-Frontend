// import { Avatar, Divider, Grid, makeStyles, Paper } from "@material-ui/core";
import { Avatar, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Fade,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MyManagePost from "./MyManagePost";
import MyManageUser from "./MyManageUser";
import CategoryIcon from "@mui/icons-material/Category";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import MyManageCategory from "./MyManageCategory";
import MyManageChart from "./MyManageChart";

const useStyles = makeStyles((theme) => ({
  active: {
    // border: "1px solid #7b35ba",
    backgroundColor: "red",
    // padding: 2,
  },
}));

function MyAdminPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const [menuId, setMenuId] = useState(1);
  const [adminame, setAdminname] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const listMenu = [
    {
      id: 1,
      name: "Dashboard",
      icon: "DashboardIcon",
    },
    {
      id: 2,
      name: "User",
      icon: "AccountBoxIcon",
    },
    {
      id: 3,
      name: "Post",
      icon: "ShoppingCartIcon",
    },
    {
      id: 4,
      name: "Category",
      icon: "CategoryIcon",
    },
  ];

  const handleMenuBtn = (id) => {
    setActive(id);
    setMenuId(id);
  };

  const handleChangeAdminname = () => {
    if (localStorage["admin_access_token"] === "ROLE_ADMIN") {
      console.log("kdsfjjksfk");
      setAdminname("Admin");
    }
    if (localStorage["admin_access_token"] === "ROLE_MANAGER") {
      console.log("mana");
      setAdminname("Manager");
    }
  };

  const handleBtnLogout = () => {
    localStorage.removeItem("admin_access_token");
    navigate("/admin/login");
    window.location.reload(false);
  };

  useEffect(() => {
    console.log("useEffect k vao af");
    handleChangeAdminname();
  }, []);

  return (
    <Grid container style={{}}>
      <Grid
        item
        xs={2}
        style={{ borderRight: "1px dashed #E0E4E8", height: "100vh" }}
      >
        <Stack direction="column" spacing={8}>
          <div
            style={{ margin: 20, display: "flex", justifyContent: "center" }}
          >
            <img width="auto" height={80} alt="" src="/upload/logo1.png"></img>
          </div>
          <div
            style={{
              backgroundColor: "#E8EBEE",
              height: 70,
              borderRadius: 8,
              margin: 20,
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              justifyContent: "center",
            }}
          >
            {adminame === "Admin" ? (
              <Avatar alt="" src="/upload/admin.jpg" />
            ) : (
              <Avatar alt="" src="/upload/manager.jpg" />
            )}
            <p style={{ paddingLeft: 8 }}>{adminame}</p>
          </div>
          <div>
            <Stack direction="column" spacing={1}>
              {listMenu.map((item) => {
                return (
                  <div
                    onClick={() => {
                      handleMenuBtn(item.id);
                      console.log("item.id:::", item.id);
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyItems: "center",
                        backgroundColor: "#E8EBEE",
                        border: item.id == active && "2px solid #7b35ba",
                        padding: 12,
                        marginLeft: 8,
                        marginRight: 8,
                        borderRadius: 8,
                      }}
                    >
                      {item.name === "Dashboard" && (
                        <DashboardIcon style={{ fill: "#7b35ba" }} />
                      )}{" "}
                      {item.name === "User" && (
                        <AccountBoxIcon style={{ fill: "#7b35ba" }} />
                      )}{" "}
                      {item.name === "Post" && (
                        <ShoppingCartIcon style={{ fill: "#7b35ba" }} />
                      )}{" "}
                      {item.name === "Category" && (
                        <CategoryIcon style={{ fill: "#7b35ba" }} />
                      )}{" "}
                      <p>{item.name}</p>
                    </Stack>
                  </div>
                );
              })}

              {/* <Stack
                direction="row"
                spacing={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  backgroundColor: "#E8EBEE",
                  cursor: "pointer",
                  padding: 12,
                  marginLeft: 8,
                  marginRight: 8,
                  borderRadius: 8,
                }}
              >
                <AccountBoxIcon style={{ fill: "#7b35ba" }} /> <p>User</p>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  backgroundColor: "#E8EBEE",
                  cursor: "pointer",
                  padding: 12,
                  marginLeft: 8,
                  marginRight: 8,
                  borderRadius: 8,
                }}
              >
                <ShoppingCartIcon style={{ fill: "#7b35ba" }} /> <p>Post</p>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  cursor: "pointer",
                  backgroundColor: "#E8EBEE",
                  padding: 12,
                  marginLeft: 8,
                  marginRight: 8,
                  borderRadius: 8,
                }}
              >
                <DashboardIcon style={{ fill: "#7b35ba" }} /> <p>Dashboard</p>
              </Stack> */}
            </Stack>
          </div>
        </Stack>
      </Grid>

      <Grid item xs={10} style={{ backgroundColor: "#F1ECF5" }}>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 30,
              marginRight: 60,
            }}
          >
            <Stack direction="row" spacing={0.5} justifyContent="center">
              {adminame === "Admin" ? (
                <Avatar alt="" src="/upload/admin.jpg" />
              ) : (
                <Avatar alt="" src="/upload/manager.jpg" />
              )}
              <IconButton onClick={handleClick}>
                <ExpandMoreIcon />
              </IconButton>
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleBtnLogout}>Logout</MenuItem>
              </Menu>
            </Stack>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="column">
            {menuId === 1 && <MyManageChart />}
            {menuId === 2 && <MyManageUser />}
            {menuId === 3 && <MyManagePost />}
            {menuId === 4 && <MyManageCategory />}
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MyAdminPage;
