import { Avatar, Grid, Paper, Stack } from "@mui/material";
import { Divider, makeStyles } from "@material-ui/core";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../helps/useWindowDimensions";
import { getPostId } from "../../redux/postSlice";
import { fontSize } from "@mui/system";
import { formatCash } from "../../helps/common";

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
    fontSize: 10,
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

function MyListOtherPost({ userId }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [listPost, setListPost] = useState([]);

  const getListPostByUserId = async () => {
    try {
      const { data } = await axios.get(`/common/post/user/${userId}`);
      // const _listPost = paginate(data.data, 6, page);
      console.log("listPostByUserId:::", data.data);
      setListPost(data.data);
    } catch (error) {
      console.log("err_getListPostShowByUserId:::", error);
    }
  };

  useEffect(() => {
    getListPostByUserId();
  }, []);

  return (
    <>
      <Grid
        container
        xs={8}
        justifyContent="center"
        style={{ marginTop: 12, backgroundColor: "#F1ECF5", borderRadius: 12 }}
      >
        <Grid item xs={12}>
          <p
            style={{
              fontSize: 18,
              margin: 12,
              color: "#7b35ba",
              fontWeight: "bold",
            }}
          >
            Tin đăng khác
            <Divider
              style={{ backgroundColor: "#7b35ba", marginTop: 4 }}
            ></Divider>
          </p>
        </Grid>
        <Grid
          container
          xs={12}
          style={{
            marginBottom: 12,
            marginTop: 12,
            display: "flex",
            flexWrap: "wrap",
            maxHeight: 560,
            minHeight: 280,
            overflow: "auto",
            // overflowX: "hidden",
          }}
        >
          {listPost.map((item) => {
            return (
              <Grid key={item.id} item xs={2} sm={2}>
                <div
                  onClick={() => {
                    navigate(`/post/${item.id}`);
                    window.location.reload(false);

                    dispatch(getPostId(item.id));
                  }}
                  className="hover"
                >
                  {console.log("image:::::::::::", item.image.imagePath)}
                  <Paper className={classes.paper_cus}>
                    <Stack direction="column" alignItems="center" spacing={1}>
                      <div style={{ paddingTop: 8, position: "relative" }}>
                        <Avatar
                          variant={"rounded"}
                          src={item.image.imagePath}
                          alt="The image"
                          style={{
                            width: width / 11,
                            height: width / 11,
                            // margin: 1,
                          }}
                        />
                        <div></div>
                      </div>
                      <p className={classes.title_cus}>{item.title}</p>
                      <p className={classes.price_cus}>
                        {item.price === -1
                          ? "Đấu giá"
                          : formatCash(String(item.price)) + " đ"}
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
                        </div>
                      </div>
                    </Stack>
                  </Paper>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}

export default MyListOtherPost;
