import { Box, Grid } from "@material-ui/core";
import { Button, CircularProgress, Divider, Modal, Stack } from "@mui/material";
import React, { useEffect } from "react";
import MyCategory from "../common/MyCategory";
import MyListProduct from "../common/MyListProduct";
import MyThumbnailAds from "../common/MyThumbnailAds";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MyListAutionPost from "./MyListAutionPost";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#F1ECF5",
  border: "1px solid #000",
  boxShadow: 4,
  p: 1,
};

const listPlace = [
  {
    id: 1,
    place: "HÀ NỘI",
  },
  {
    id: 2,
    place: "ĐÀ NẴNG",
  },
  {
    id: 3,
    place: "HỒ CHÍ MINH",
  },
];

function MyBodyHome() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [listPost, setListPost] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const pagingNumber = useSelector((state) => state.paging.paging);
  const [loading, setLoading] = useState(false);
  // const [city, setCity] = React.useState(null);
  // const [listCity, setListCity] = useState([]);
  // console.log("pagingnumber::::", pagingNumber);

  // const getPlace = async () => {
  //   localStorage.setItem("suggest_place", "hehehe");
  // };

  const getPostByPlace = async () => {
    try {
      let _place = "";
      if (localStorage["suggest_place"] === "HÀ NỘI") {
        _place = "Thành Phố Hà Nội";
      } else if (localStorage["suggest_place"] === "ĐÀ NẴNG") {
        _place = "Thành Phố Đà Nẵng";
      } else if (localStorage["suggest_place"] === "HỒ CHÍ MINH") {
        _place = "Thành Phố Hồ Chí Minh";
      } else {
      }
      console.log("_place:::", _place);
      const { data } = await axios.get(
        `/common/post/place?name=${_place}&page=${pagingNumber}`
      );
      setListPost(data.data);
      setTotalPage(data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!localStorage["suggest_place"]) {
      handleOpen();
    }
  }, []);

  useEffect(() => {
    getPostByPlace();
  }, [pagingNumber]);

  return (
    <div>
      <Grid container justifyContent="center">
       
        <Grid item xs={8}>
          <Stack direction="column" spacing={2} bgcolor="white">
            <MyThumbnailAds />
            <MyCategory />
            <MyListProduct listPost={listPost} totalPage={totalPage} />
            <MyListAutionPost />
            <div>
              {/* <Button onClick={handleOpen}>Open modal</Button> */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style} style={{ borderRadius: 8 }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    textAlign="center"
                    spacing={1}
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      spacing={2}
                      alignItems="center"
                      style={{ backgroundColor: "#7b35ba", borderRadius: 4 }}
                    >
                      <LocationCityIcon
                        fontSize="large"
                        style={{ fill: "white" }}
                      />
                      <p style={{ fontSize: 40, color: "white" }}>
                        where are you living?
                      </p>
                    </Stack>
                    <Divider />
                    {listPlace.map((item) => {
                      return (
                        <div key={item.id}>
                          <Stack
                            direction="row"
                            justifyContent="center"
                            spacing={2}
                            alignItems="center"
                            style={{ borderRadius: 4 }}
                          >
                            <p
                              onClick={() => {
                                console.log("ha noi");
                                localStorage.setItem(
                                  "suggest_place",
                                  item.place
                                );
                                getPostByPlace();
                                handleClose();
                              }}
                              style={{ fontSize: 40, cursor: "pointer" }}
                            >
                              {item.place}
                            </p>
                          </Stack>
                          <Divider />
                        </div>
                      );
                    })}
                  </Stack>
                </Box>
              </Modal>
            </div>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyBodyHome;
