import { Grid, IconButton, Paper } from "@material-ui/core";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { formatCash } from "../../helps/common";

function MyListPostBySearch() {
  const [listPost, setListPost] = useState([]);
  // const [like, setLike] = useState(false);
  const navigate = useNavigate();
  // const [search, setSearch] = useState()
  const search = useSelector((state) => state.search.search);

  const getlistPostBySearch = async () => {
    try {
      console.log("search nek", search);
      const { data } = await axios.get(`/common/post/search/value/${search}`);
      setListPost(data.data);
      console.log("search", data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getlistPostBySearch();
  }, [search]);

  return (
    <Grid container style={{ minHeight: "70vh" }} justifyContent="center">
      <Grid item xs={8}>
        <Grid container justifyContent="flex-start">
          <Grid item xs={7}>
            {listPost.map((item) => {
              return (
                <Paper
                  key={item.id}
                  style={{ marginLeft: 12, marginRight: 12, marginBottom: 12 }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    padding={1}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" spacing={2}>
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(`/post/${item.id}`);
                        }}
                        alt=""
                        width={80}
                        height={80}
                        src={item.image.imagePath}
                      ></img>
                      <Stack
                        direction="column"
                        spacing={0.5}
                        justifyContent="start"
                      >
                        <p>{item.title}</p>
                        <Stack direction="row">
                          <p style={{ color: "red" }}>
                            {(item.price === -1 && "Đấu giá") ||
                              formatCash(String(item.price)) + " " + "đ"}
                          </p>
                          {/* <p style={{ color: "red" }}>đ</p> */}
                        </Stack>
                        <p>{item.createdAt}</p>
                      </Stack>
                    </Stack>
                    <div
                      style={{
                        display: "inline-flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      {/* {item.liked ?
                      <IconButton size='small' variant="outlined" style={{ borderColor: 'red', marginRight: 12, }}
                        onClick={async () => {
                          console.log('postid', item.id)
                          await updateLikeForPost(item.id, false);
                          setLike(!like)
                        }}>

                        <ThumbUpAltIcon style={{ fill: '#4676E4' }} />
                      </IconButton>
                      :
                      <IconButton size='small' variant="outlined" style={{ borderColor: 'red', marginRight: 12, }}
                        onClick={async () => {
                          console.log('postid', item.id)
                          await updateLikeForPost(item.id, true);
                          setLike(!like)
                        }}>
                        <ThumbUpAltIcon style={{ fill: '#F1ECF5' }} />
                      </IconButton>} */}
                    </div>
                  </Stack>
                </Paper>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MyListPostBySearch;
