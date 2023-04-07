import { MenuItem } from "@material-ui/core";
import { Grid, Pagination, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyChildCategory from "./MyChildCategory";
import MyListProductByCate from "./MyListProductByCate";
var _ = require("lodash");

function MyBodyCategory() {
  const [listCity, setListCity] = useState([]);
  const [city, setCity] = useState("");
  const [listPost, setListPost] = useState([]);
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(0);
  const [newPost, setNewPost] = useState("");

  const { categoryParentId } = useParams();
  const categoryChildId = useSelector(
    (state) => state.categoryChildId.categoryChildId
  );

  // get all city of post
  const getListCity = async () => {
    try {
      const { data } = await axios.get("/common/allCityPost");
      console.log("getAllCityPost:::", data.data);
      setListCity(data.data);
    } catch (error) {
      console.log("err_getAllCityPost", getListCity);
    }
  };

  const getListPost = async () => {
    try {
      const { data } = await axios.get(`/common/somePost/${categoryParentId}`);
      const _listPost = paginate(data.data, 18, page);
      setListPost(_listPost);
      // return data.data;
    } catch (error) {
      console.log("err_getSomePost:::", error);
    }
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
    console.log("handleChangeCity:::", event.target.value);
  };

  const handleChangeOrder = (event) => {
    setOrder(event.target.value);
    console.log("handleChangeOrder:::", event.target.value);
  };

  const handleChangeNewPost = (event) => {
    setNewPost(event.target.value);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    console.log("value paging::::", value);
  };

  const paginate = (listPost, page_size, page_number) => {
    const totalNumberPage = Math.ceil(listPost.length / 18);
    setTotalNumberPage(totalNumberPage);
    return listPost.slice(
      (page_number - 1) * page_size,
      page_number * page_size
    );
  };

  const filterCatePost = async () => {
    try {
      const { data } = await axios.get(`/common/somePost/${categoryParentId}`);
      console.log("cateId:::", categoryChildId);
      const _listPost = _.filter(data.data, (item) => {
        return item.cateId === Number(categoryChildId);
      });
      const __listPost = paginate(_listPost, 18, page);
      setListPost(__listPost);
    } catch (error) {}
  };

  const filterCityPost = async () => {
    // const { data } = await axios.get(`/common/somePost/${categoryParentId}`);
    const _listPost = _.filter(listPost, (item) => {
      return item.province === String(city);
    });
    const __listPost = paginate(_listPost, 18, page);
    setListPost(__listPost);
  };

  const filterOrderPrice = () => {
    const _listPost = _.orderBy(listPost, ["price"], [`${order}`]).filter(
      (item) => item.price !== -1
    );
    console.log("orderPost:::", _listPost);
    const __listPost = paginate(_listPost, 18, page);
    setListPost(__listPost);
  };

  const filterNewPost = () => {
    try {
      if (newPost === "createdAt") {
        // const _listPost = _.orderBy(listPost, ["createdAt"], ["desc"]);
        listPost.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
        console.log(" tin moi ::::", listPost);
        const _listPost = paginate(listPost, 18, page);
        setListPost(_listPost);
        return;
      }
      if (newPost === "bid") {
        filterBidPost();
        return;
      }
    } catch (error) {}
  };

  const filterBidPost = async () => {
    // const listPost = await getListPost();
    console.log("listPost:::", listPost);
    const _listPost = _.filter(listPost, (item) => {
      return item.price === Number(-1);
    });
    const __listPost = paginate(_listPost, 18, page);
    setListPost(__listPost);
  };

  // useEffect(() => {
  //   filterBidPost();
  // }, []);

  useEffect(() => {
    filterNewPost();
  }, [newPost]);

  useEffect(() => {
    filterCatePost();
  }, [categoryChildId]);

  useEffect(() => {
    filterCityPost();
  }, [city]);

  useEffect(() => {
    filterOrderPrice();
  }, [order]);

  useEffect(() => {
    getListPost();
  }, [page]);

  useEffect(() => {
    getListCity();
    getListPost();
  }, []);

  return (
    <div>
      <Grid container justifyContent="center" minHeight="70vh">
        <Grid item xs={8}>
          <Stack
            direction="column"
            spacing={2}
            bgcolor="white"
            // overflow="scroll"
          >
            <MyChildCategory />
            <Stack direction="row" spacing={2}>
              <div style={{ width: 200, color: "black" }}>
                <TextField
                  color="secondary"
                  fullWidth
                  SelectProps={{ MenuProps: { disableScrollLock: true } }}
                  // name="cateParentId"
                  id="standard-size-small"
                  select
                  label="Trạng thái"
                  size="small"
                  variant="outlined"
                  onChange={handleChangeNewPost}
                >
                  <MenuItem value="createdAt">{"Tin Mới"}</MenuItem>
                  <MenuItem value="bid">{"Đang đấu giá"}</MenuItem>
                </TextField>
              </div>

              <div style={{ width: 200, color: "black" }}>
                <TextField
                  color="secondary"
                  fullWidth
                  SelectProps={{ MenuProps: { disableScrollLock: true } }}
                  // name="cateParentId"
                  id="standard-size-small"
                  select
                  label="Giá"
                  size="small"
                  variant="outlined"
                  onChange={handleChangeOrder}
                >
                  <MenuItem value="asc">{"Giá từ thấp tới cao"}</MenuItem>
                  <MenuItem value="desc">{"Giá từ cao tới thấp"}</MenuItem>
                </TextField>
              </div>
              <div style={{ width: 300 }}>
                <TextField
                  color="secondary"
                  fullWidth
                  SelectProps={{ MenuProps: { disableScrollLock: true } }}
                  // name="cateParentId"
                  id="standard-size-small"
                  select
                  label="Thành phố"
                  size="small"
                  variant="outlined"
                  onChange={handleChangeCity}
                >
                  {listCity.map((item) => {
                    return (
                      <MenuItem value={item.DISTINCT}>{item.DISTINCT}</MenuItem>
                    );
                  })}
                </TextField>
              </div>
            </Stack>
            <MyListProductByCate listPost={listPost} />
          </Stack>
        </Grid>
      </Grid>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
        <Pagination
          count={totalNumberPage}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default MyBodyCategory;
