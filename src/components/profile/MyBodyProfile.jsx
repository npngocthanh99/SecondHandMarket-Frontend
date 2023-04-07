import {
  Button,
  Divider,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Rating,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

function MyBodyProfile() {
  const [value, setValue] = React.useState(2);
  const [listPostShow, setListPostShow] = useState([]);
  const [like, setLike] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState();

  const navigate = useNavigate();
  const { userId } = useParams();

  const getListPostShowByUserId = async () => {
    try {
      const { data } = await axios.get(`/common/post/user/${userId}`);
      const _listPost = paginate(data.data, 6, page);
      setListPostShow(_listPost);
    } catch (error) {
      console.log("err_getListPostShowByUserId:::", error);
    }
  };

  const getUserInfoByUserId = async () => {
    try {
      const { data } = await axios.get(`/common/user/${userId}`);
      setUserInfo(data.data);
    } catch (error) {
      console.log("err_getUserInfoByUserId:::", error);
    }
  };

  const handlChangePage = (event, value) => {
    setPage(value);
  };

  const paginate = (listPost, page_size, page_number) => {
    const totalNumberPage = Math.ceil(listPost.length / 6);
    setTotalNumberPage(totalNumberPage);
    return listPost.slice(
      (page_number - 1) * page_size,
      page_number * page_size
    );
  };

  useEffect(() => {
    getListPostShowByUserId();
  }, [like, page]);

  useEffect(() => {
    getUserInfoByUserId();
  }, []);

  return (
    <Grid container justifyContent="center" style={{ minHeight: "70vh" }}>
      <Grid
        item
        xs={6}
        style={{ backgroundColor: "#F1ECF5", borderRadius: 12 }}
      >
        <Stack direction="column">
          <Paper style={{ padding: 8, marginBottom: 12, margin: 12 }}>
            <Stack direction="row" justifyContent="start">
              <Stack direction="row" spacing={2}>
                <img
                  src={
                    userInfo.avatarImg ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                  }
                  alt=""
                  style={{
                    // border: " 1px solid #7b35ba",
                    verticalAlign: "middle",
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                  }}
                />
                <Stack direction="column" justifyContent="center" spacing={2}>
                  <p style={{ fontSize: 18 }}>
                    {userInfo.firstName} {userInfo.lastName}
                  </p>
                  {userInfo.userId === localStorage["userId"] && (
                    <Button
                      style={{
                        color: "black",
                        textTransform: "none",
                        backgroundColor: "#FFD501",
                      }}
                      size="small"
                      onClick={() => {
                        navigate("/editProfile");
                      }}
                    >
                      Chỉnh sửa
                    </Button>
                  )}
                </Stack>
              </Stack>

              <Stack
                direction="column"
                marginLeft={10}
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1}>
                  <p>Đánh giá: {userInfo.starRating}</p>
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                      // marginTop: -0.5
                    }}
                  >
                    <Rating
                      size="small"
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>
                </Stack>
                <Stack direction="row">
                  <p>Ngày tham gia: {userInfo.createdAt}</p>
                </Stack>
                <Stack direction="row">Địa chỉ: {userInfo.address}</Stack>
                <Stack direction="row">Số điện thoại: {userInfo.phone}</Stack>
              </Stack>
            </Stack>
          </Paper>

          <div style={{}}>
            <p
              style={{
                fontSize: 18,
                margin: 12,
                color: "#7b35ba",
                fontWeight: "bold",
              }}
            >
              Tin đang đăng
            </p>
            <Divider
              style={{
                backgroundColor: "#7b35ba",
                marginLeft: 12,
                marginRight: 12,
              }}
            />

            <div style={{ paddingTop: 12 }}>
              {listPostShow.map((item) => {
                return (
                  <div
                    onClick={() => {
                      navigate(`/post/${item.id}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <Paper
                      key={item.id}
                      style={{
                        marginLeft: 12,
                        marginRight: 12,
                        marginBottom: 12,
                      }}
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
                            alt=""
                            width={100}
                            height={100}
                            src={item.image.imagePath}
                          ></img>
                          <Stack
                            direction="column"
                            spacing={1}
                            justifyContent="start"
                          >
                            <p>{item.title}</p>
                            <p style={{ color: "red" }}>
                              {(Number(item.price) === -1 && "Đấu giá") ||
                                (Number(item.price) === 0 && "Miễn phí") ||
                                item.price}
                            </p>
                            <p>{item.createdAt}</p>
                          </Stack>
                        </Stack>
                        <div
                          style={{
                            display: "inline-flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          {item.Likes.id ? (
                            <IconButton
                              size="small"
                              variant="outlined"
                              style={{ borderColor: "red", marginRight: 12 }}
                            >
                              <ThumbUpAltIcon style={{ fill: "#4676E4" }} />
                            </IconButton>
                          ) : (
                            <IconButton
                              size="small"
                              variant="outlined"
                              style={{ borderColor: "red", marginRight: 12 }}
                            >
                              <ThumbUpAltIcon style={{ fill: "#F1ECF5" }} />
                            </IconButton>
                          )}
                        </div>
                      </Stack>
                    </Paper>
                  </div>
                );
              })}

              <div
                style={{
                  display: "flex",
                  // alignItems: "center",
                  // alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  count={totalNumberPage}
                  page={page}
                  onChange={handlChangePage}
                />
              </div>
            </div>
          </div>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default MyBodyProfile;

// {
//   listPostShow.map(item => {
//     return (
//       <Paper key={item.id} style={{ marginLeft: 12, marginRight: 12, marginBottom: 12 }}>
//         <Stack direction='row' spacing={2} padding={1} justifyContent='space-between' alignItems='center'>
//           <Stack direction='row' spacing={2}>
//             <img style={{ cursor: 'pointer' }} onClick={() => { navigate(`/post/${item.id}`) }} alt='' width={100} height={100} src={item.image.proImg}></img>
//             <Stack direction='column' spacing={1} justifyContent='start'>
//               <p>{item.name}</p>
//               <p>{item.price}</p>
//               <p>{item.updatedAt}</p>
//             </Stack>
//           </Stack>
//           <div style={{ display: 'inline-flex', justifyContent: 'flex-end' }}>

//             <Button size='small' variant="outlined" style={{ borderColor: 'red', marginRight: 4, boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px ' }}
//               onClick={() => {
//                 navigate(`/edit/post/${item.id}`)
//               }}>
//               {/* <EditIcon style={{ paddingRight: 4 }} /> */}
//               Edit
//             </Button>
//             <Button size='small' variant="outlined" style={{ borderColor: 'red', marginRight: 4, boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px ' }}
//               onClick={() => {
//                 console.log(item.id);
//                 // hidePostByPostId(item.id, 4)
//                 // setHidePost(!hidePost)
//               }}
//             >
//               {/* <VisibilityOffOutlinedIcon style={{ paddingRight: 4 }} /> */}
//               Hide
//             </Button>
//           </div>
//         </Stack>
//       </Paper>
//     )
//   })
// }
