import { Button, Divider, Grid } from "@material-ui/core";
import axios from "axios";

import React, { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import useWindowDimensions from "../../helps/useWindowDimensions";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Rating, Stack } from "@mui/material";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/cartSlice";
import MyBidFeature from "./MyBidFeature";
import MyLike from "../common/MyLike";
import MyCountdownTimer from "../test/MyCountdownTimer";
import MyListUserBid from "./MyListUserBid";
import MyListSimilarPost from "./MyListSimilarPost";
import CategoryIcon from "@mui/icons-material/Category";
import { getTimeOver } from "../../redux/timeOverSice";
import MyListOtherPost from "./MyListOtherPost";
import { formatCash } from "../../helps/common";
import moment from "moment";
// const socket = io();
function MyBodyDetail() {
  console.log("**rerender");
  const { width } = useWindowDimensions();
  const [listPost, setListPost] = useState([]);
  const [value, setValue] = React.useState(2);
  const [images, setImages] = React.useState([]);
  const [time, setTime] = useState("");
  const { _postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPostAuction, setIsPostAuction] = useState(false);
  // const [listUserBid, setListUserBid] = useState([]);
  const [isBid, setIsBid] = useState(0);
  const [priceUserBid, setPriceUserBid] = useState("");
  const [bidOrderId, setBidOrderId] = useState("");
  const [isRemove, setIsRemove] = useState(true);
  const [postAuctionId, setPostAutionId] = useState("");
  const [bidEndTime, setBidEndTime] = useState("");

  // const categoryChildId = useSelector((state) => state.categoryChildId.categoryChildId)
  const timeOver = useSelector((state) => state.timeOver.timeOver);
  // console.log("timeOver:::", _timeOver);

  const getPostByPostId = async () => {
    try {
      const { data } = await axios.get(`/common/post/${_postId}`);
      const _listPost = [];
      _listPost.push(data.data);
      console.log("listPost:::", _listPost[0]);
      const _bidEndTimePost = _listPost[0].PostAuction.bidEndTime;
      if (_bidEndTimePost) {
        if (new Date(_bidEndTimePost).getTime() < Date.now()) {
          dispatch(getTimeOver(true));
        } else {
          dispatch(getTimeOver(false));
        }
      }
      setListPost(_listPost);
      setValue(_listPost[0].User.starRating);

      const _listImage = _listPost[0].listImage.map((item) => {
        return {
          url: item.imagePath,
        };
      });
      setImages(_listImage);
      var d = new Date(data.data.createdAt);
      // const _time = moment(d).endOf("day").fromNow();
      // const _time = d.toUTCString();
      const _time = "1 giờ trước";
      setTime(_time);
      // SET END TIME
      setBidEndTime(data.data.PostAuction.bidEndTime);
      setPostAutionId(data.data.PostAuction.id);
      // await getListUserBid(data.data.PostAuction.id);
      if (data.data.price === -1) {
        setIsPostAuction(true);
      } else {
        setIsPostAuction(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  MUA
  const handleBuy = async () => {
    if (!localStorage["access_token"]) {
      localStorage.setItem("page_url", window.location.href);
      navigate("/login");
    }

    try {
      const { data } = await axios.post(
        "/user/addPostToCart",
        {
          postId: _postId,
        },
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );
      console.log("data_handlebuy", data.data);
      if (data.data) {
        // dispatch(getCart());
        await axios.get("/user/cart/qty", {
          headers: {
            Authorization: localStorage["access_token"],
          },
        });
      } else {
      }
    } catch (error) {
      console.log("Err_handle_buy:::", error);
    }
  };

  useEffect(() => {
    getPostByPostId();
  }, []);

  return listPost.map((item) => {
    return (
      <div key={item.id}>
        <Grid container justifyContent="center">
          <Grid
            item
            xs={8}
            style={{ backgroundColor: "#F1ECF5", borderRadius: 12 }}
          >
            <Grid container justifyContent="center" style={{ padding: 30 }}>
              <Grid item xs={8}>
                <div>
                  <div style={{ position: "relative" }}>
                    <SimpleImageSlider
                      autoPlay="true"
                      width={(width * 5) / 15}
                      height={(width * 4) / 15}
                      images={images}
                      showBullets={false}
                      showNavs={true}
                    />
                    <div
                      style={{ position: "absolute", bottom: 10, right: 180 }}
                    >
                      {time}
                    </div>
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <Stack spacing={2}>
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ marginRight: 20 }}>
                          <p
                            style={{
                              color: "black",
                              fontSize: 20,
                              fontWeight: "bold",
                            }}
                          >
                            {item.title}
                          </p>
                        </div>
                        <div style={{ marginRight: 150, cursor: "pointer" }}>
                          <MyLike postId={item.id}></MyLike>
                        </div>
                      </div>
                      <p style={{ color: "#C90927", fontWeight: "bold" }}>
                        {item.price === -1
                          ? "Đấu giá"
                          : formatCash(String(item.price)) + " đ"}
                      </p>
                      <p style={{ color: "black" }}>
                        {item.description}
                        <br />
                      </p>

                      <Grid container spacing={2} style={{ marginLeft: -10 }}>
                        <Grid item xs={5}>
                          <Stack direction="row" spacing={1}>
                            <BuildCircleIcon style={{ fill: "#7b35ba" }} />
                            <p style={{ color: "black" }}>
                              Tình trạng: {item.PostCondition.status}
                            </p>
                          </Stack>
                        </Grid>
                        <Grid item xs={5}>
                          <Stack direction="row" spacing={1}>
                            <VerifiedUserIcon style={{ fill: "#7b35ba" }} />
                            <p style={{ color: "black" }}>
                              Bảo hành: {item.Warranty.status}
                            </p>
                          </Stack>
                        </Grid>
                        <Grid item xs={5}>
                          <Stack direction="row" spacing={1}>
                            <ApartmentIcon style={{ fill: "#7b35ba" }} />
                            <p style={{ color: "black" }}>
                              Sản xuất tại: {item.Origin.countryName}
                            </p>
                          </Stack>
                        </Grid>
                        <Grid item xs={5}>
                          <Stack direction="row" spacing={1}>
                            <CategoryIcon style={{ fill: "#7b35ba" }} />
                            <p style={{ color: "black" }}>
                              Thể loại: {item.Category.cateName}
                            </p>
                          </Stack>
                        </Grid>
                      </Grid>

                      <Divider style={{ backgroundColor: "#7b35ba" }} />
                      <Stack direction="row" spacing={1}>
                        <LocationOnIcon style={{ fill: "#7b35ba" }} />
                        <p style={{ color: "black" }}>
                          {item.street} - {item.ward} - {item.district} -{" "}
                          {item.province}
                        </p>
                      </Stack>
                    </Stack>
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <Divider
                  style={{ marginBottom: 12, backgroundColor: "#7b35ba" }}
                />
                <div>
                  <div style={{ cursor: "pointer", color: "red" }}>
                    <Stack direction="column" spacing={2}>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={item.User.avatarImg}
                          sx={{ width: 48, height: 48 }}
                        />

                        <p
                          style={{
                            color: "#7b35ba",
                            fontSize: 20,
                            fontWeight: "bold",
                          }}
                        >
                          {item.User.firstName} {item.User.lastName}
                        </p>
                      </Stack>

                      <Stack
                        style={{
                          marginTop: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          alignContent: "center",
                        }}
                      >
                        <Button
                          style={{
                            textTransform: "none",
                            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            backgroundColor: "#7b35ba",
                            color: "white",
                            // marginLeft: 40,
                            // marginRight: -80,
                            width: 200,
                          }}
                          size="small"
                          onClick={() => {
                            navigate(`/profile/user/${item.User.userId}`);
                            console.log("..... alo ", item.User.userId);
                          }}
                        >
                          Xem trang
                        </Button>
                      </Stack>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Rating
                          size="large"
                          name="simple-controlled"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                        />
                      </div>

                      <Stack
                        direction="row"
                        spacing={2}
                        style={{
                          display: "inline-flex",
                          justifyContent: "start",
                          border: "1px solid #33A837",
                          borderRadius: 4,
                          backgroundColor: "white",
                        }}
                      >
                        <PhoneIphoneIcon
                          style={{
                            marginTop: 2,
                            marginLeft: 8,
                            fill: "#33A837",
                          }}
                        />
                        <p
                          style={{
                            fontSize: 20,
                            color: "#33A837",
                            fontWeight: "bolder",
                          }}
                        >
                          {item.User.phone}
                        </p>
                      </Stack>
                      {/* </div> */}
                      <Button
                        size="small"
                        style={{
                          textTransform: "none",
                          backgroundColor: "#33A837",
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                          color: "white",
                        }}
                      >
                        <QuestionAnswerIcon style={{ marginRight: 8 }} />
                        Nhắn tin với người bán
                      </Button>
                      {/* đấu giá */}
                      {isPostAuction ? (
                        <Stack direction="column" spacing={2}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <MyCountdownTimer
                              time={bidEndTime}
                              postId={_postId}
                            />
                          </div>
                          {!timeOver && (
                            <>
                              <MyBidFeature
                                isRemove={isRemove}
                                bidOrderId={bidOrderId}
                                postId={item.id}
                                postAuctionId={item.PostAuction.id}
                                priceStart={item.PostAuction.priceStart}
                                priceUserBid={priceUserBid}
                                isBid={isBid}
                                bidEndTime={bidEndTime}
                              ></MyBidFeature>
                            </>
                          )}
                          <Divider />
                          <MyListUserBid
                            postId={_postId}
                            postAuctionId={postAuctionId}
                          ></MyListUserBid>
                        </Stack>
                      ) : (
                        <Button
                          fullWidth
                          size="small"
                          style={{
                            backgroundColor: "#FFD600",
                            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                          }}
                          onClick={handleBuy}
                        >
                          MUA
                        </Button>
                      )}
                    </Stack>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <MyListOtherPost userId={item.User.userId}></MyListOtherPost>
          <MyListSimilarPost cateId={item.cateId}></MyListSimilarPost>

          {/* </Grid> */}
        </Grid>
      </div>
    );
  });
}

export default MyBodyDetail;
