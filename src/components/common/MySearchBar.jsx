import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Stack } from "@mui/material";
import {
  Avatar,
  Button,
  Divider,
  Fade,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import { getSearch } from "../../redux/searchSlice";

const Search = styled("div")(({ theme }) => ({
  height: 35,
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  color: "#7b35ba",
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  backgroundColor: "white",
  "&:hover": {
    // backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  // height: 20,
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  height: 35,
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      // dai cua thanh searhc
      width: "60ch",
    },
  },
}));

export default function MySearchBar() {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [avt, setAvt] = useState("");
  const [userId, setUserId] = useState("");
  const [search, setSearch] = useState();

  const changeStatusLogin = () => {
    if (localStorage["access_token"] !== undefined) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  const setAvtandUsername = async () => {
    try {
      const { data } = await axios.get("/user/userInfo", {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      const fullName = data.data.firstName + " " + data.data.lastName;
      console.log("userInfo:*****************", data.data);
      localStorage.setItem("userId", data.data.userId);
      setUserName(fullName);
      setAvt(data.data.avatarImg);
      setUserId(data.data.userId);
    } catch (error) {
      console.log("err_setAvt:::", error);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  // more

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setAvtandUsername();
    changeStatusLogin();
  }, []);

  return (
    <Box display="space-around" paddingBottom={1}>
      <Stack direction="row" justifyContent="space-between" marginRight={3}>
        <Search
          onChange={(e) => {
            console.log("value:::", e.target.value);
            let _search = e.target.value.replace(/^\s+|\s+$/gm, "");
            dispatch(getSearch(_search));
            navigate("/search");
            if (e.target.value === "" || e.target.value === null) {
              navigate("/");
            }
          }}
        >
          <SearchIconWrapper>
            <SearchIcon style={{ fill: "#7b35ba" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Tìm kiếm…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        {isLogin ? (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/profile/user/${userId}`);
            }}
          >
            <Stack direction="row" spacing={5}>
              <div style={{ width: 12, height: 12, marginTop: -4 }}>
                <Avatar
                  alt=""
                  src={
                    avt ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                  }
                  sx={{ width: 12, height: 12 }}
                />
              </div>
              <div style={{ marginTop: 6 }}>
                <p>{userName}</p>
              </div>
            </Stack>
          </div>
        ) : (
          <div style={{ cursor: "pointer" }}>
            <Stack direction="row" spacing={5}>
              <div style={{ width: 12, height: 12, marginTop: -4 }}>
                <Avatar
                  alt=""
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                  sx={{ width: 12, height: 12 }}
                />
              </div>
              <div
                style={{ marginTop: 6 }}
                onClick={() => {
                  navigate("/login");
                  console.log("su kien login");
                }}
              >
                <p>Login</p>
              </div>
            </Stack>
          </div>
        )}

        <div style={{ marginLeft: -20 }}>
          {isLogin && (
            <>
              <IconButton
                size="small"
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <ExpandMoreIcon style={{ fill: "white" }} />
              </IconButton>
              <Menu
                disableScrollLock={true}
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem
                  style={{ color: "#7b35ba " }}
                  onClick={() => {
                    handleClose();
                    navigate(`/profile/user/${userId}`);
                  }}
                >
                  Profile
                </MenuItem>
                <Divider />
                <MenuItem
                  style={{ color: "#7b35ba " }}
                  onClick={() => {
                    handleLogOut();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </div>

        <Button
          style={{
            textTransform: "none",
            color: "white",
            width: 150,
            height: 35,
            backgroundImage:
              "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
          }}
          variant="contained"
          size="small"
          onClick={() => {
            navigate("/post");
          }}
        >
          <PostAddIcon />
          <div style={{ fontSize: 14, paddingLeft: 4 }}>Đăng tin</div>
        </Button>
      </Stack>
    </Box>
  );
}

// background - color: #4158D0;
// background - image: linear - gradient(43deg, #4158D0 0 %, #C850C0 46 %, #FFCC70 100 %);
