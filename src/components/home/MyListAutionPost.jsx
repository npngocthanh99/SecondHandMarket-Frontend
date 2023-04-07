import { Avatar, Divider, Grid, makeStyles } from "@material-ui/core";
import {
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import useWindowDimensions from "../../helps/useWindowDimensions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPostId } from "../../redux/postSlice";
import { getPaging } from "../../redux/pagingSlice";
import { getPostsBidding as getPostListBidding } from "../../API/common";
// import MyCountdownTimer from "../test/MyCountdownTimer";

const useStyles = makeStyles((theme) => ({
  paper_cus: {
    cursor: "pointer",
    margin: 2,
    paddingTop: 2,
    height: 280,
  },

  title_cus: {
    // textAlign: 'left',
    marginTop: 4,
    color: "black",
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
  },

  price_cus: {
    color: "red",
    fontWeight: "bold",
  },

  avt_cus: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  address_cus: {
    color: "black",
    fontWeight: "inherit",
    fontSize: 9,
  },

  iconHeart_cus: {
    color: "blue",
    // backgroundColor: 'red',
    position: "absolute",
    bottom: 5,
    right: 5,
    zIndex: 10,
  },
}));

function MyListAutionPost() {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  // const [listProduct, setListProduct] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [listPost, setListPost] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event, value) => {
    console.log(value);
    setPage(value);
    dispatch(getPaging(value));
  };

  // const categoryChildId = useSelector(
  //   (state) => state.categoryChildId.categoryChildId
  // );

  const getPostsBidding = async () => {
    setLoading(true);
    setListPost(await getPostListBidding());
  };

  useEffect(() => {
    getPostsBidding();
    setLoading(false);
  }, []);

  return (
    <div>
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress
            style={{
              zIndex: 10000,
              color: "#7b35ba",
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          />
        </div>
      )}
      <Stack
        direction="column"
        spacing={2}
        bgcolor="#F1ECF5"
        paddingBottom={1}
        justifyContent="center"
        justifyItems="center"
        style={{ borderRadius: "8px" }}
      >
        <p
          style={{
            fontSize: 18,
            margin: 12,
            color: "#7b35ba",
            fontWeight: "bold",
          }}
        >
          Sản phẩm đang đấu giá
          <Divider
            style={{ backgroundColor: "#7b35ba", marginTop: 4 }}
          ></Divider>
        </p>
        {listPost.length === 0 && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p>Không có tin nào</p>
          </div>
        )}
        <Grid container alignItems="flex-start">
          {listPost.map((item) => {
            return (
              <Grid key={item.id} item xs={2} sm={2}>
                <div
                  onClick={() => {
                    navigate(`/post/${item.id}`);
                    dispatch(getPostId(item.id));
                  }}
                  className="hover"
                >
                  <Paper className={classes.paper_cus}>
                    <Stack direction="column" alignItems="center" spacing={1}>
                      <div style={{ paddingTop: 8, position: "relative" }}>
                        <Avatar
                          variant={"rounded"}
                          src={`http://localhost:8080/${item.PostImages[0].imagePath}`}
                          alt="The image"
                          style={{
                            width: width / 11,
                            height: width / 11,
                          }}
                        />
                        <div>
                          {/* {item.liked ? <ThumbUpIcon className={classes.iconHeart_cus} />
                                                        :
                                                        <ThumbUpIcon className={classes.iconHeart_cus} style={{ fill: 'white' }} />} */}
                        </div>
                      </div>
                      <p className={classes.title_cus}>{item.title}</p>
                      <p className={classes.price_cus}>
                        {/* {item.price === -1 ? "Đấu giá" : item.price + " đ"} */}
                        Đang đấu giá
                      </p>
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <div style={{ marginBottom: 8, display: "block" }}>
                          <img
                            alt=""
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                            className={classes.avt_cus}
                          />
                        </div>
                        <div
                          style={{
                            display: "inline-flex",
                            marginLeft: 4,
                            paddingTop: 4,
                          }}
                        >
                          <p className={classes.address_cus}>23 Giờ Trước</p>
                          <p className={classes.address_cus}>-</p>
                          <p className={classes.address_cus}>{item.province}</p>
                          {/* <p className={classes.address_cus}>{item.ListImageProducts.proImg}</p> */}
                          {/* <p className={classes.address_cus}>{pageURL}</p> */}
                        </div>
                      </div>
                    </Stack>
                  </Paper>
                </div>
              </Grid>
            );
          })}
        </Grid>
        <div style={{ display: "inline-flex", justifyContent: "center" }}>
          <Pagination count={1} page={page} onChange={handleChange} />
        </div>
      </Stack>
    </div>
  );
}

export default MyListAutionPost;
