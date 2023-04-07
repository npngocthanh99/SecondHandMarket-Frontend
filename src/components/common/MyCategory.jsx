import { Divider, makeStyles, Paper, Typography } from "@material-ui/core";
import { Stack } from "@mui/system";
import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getCategoryChildId } from "../../redux/categorySlice";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper_cus: {
    cursor: "pointer",
    width: 112,
    height: "auto",
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 12,
    paddingBottom: 8,
  },

  typography_cus: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
    color: "black",
  },

  category: {
    borderRadius: "8px",
    backgroundColor: "#F1ECF5",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // height: 210,
    // overflow: 'scroll',
    scrollbarColor: "#7b35ba",
    position: "relative",
  },

  img_cus: {
    width: 100,
    height: 100,
    borderRadius: 16,
    paddingTop: 4,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
}));

function MyCategory() {
  // const {  width } = useWindowDimensions();
  const classes = useStyles();
  const [cateArr, setCateArr] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getDataCate = async () => {
    const { data } = await axios.get("common/allCategoryParent");
    console.log("list category");
    setCateArr(data.data);
  };

  useEffect(() => {
    getDataCate();
  }, []);

  return (
    // <div className={classes.category}>
    <div style={{ backgroundColor: "#F1ECF5", borderRadius: 8 }}>
      <p
        style={{
          fontSize: 18,
          margin: 12,
          color: "#7b35ba",
          fontWeight: "bold",
        }}
      >
        Thể loại
        {/* <Divider style={{ backgroundColor: "#7b35ba", marginTop: 4 }}></Divider> */}
      </p>

      <Stack
        direction="row"
        justifyContent="center"
        justifyItems="center"
        alignContent="center"
        justifySelf="center"
      >
        {cateArr.map((item) => {
          return (
            <div
              key={item.id}
              className={classes.paper_cus}
              onClick={() => {
                dispatch(getCategoryChildId(item.id));
                navigate(`/category/${item.id}`);
              }}
            >
              <Stack direction="column" alignItems="center">
                <img
                  alt=""
                  src={item.cateLogoImg}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 16,
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                />
                <Typography className={classes.typography_cus}>
                  {item.cateName}
                </Typography>
              </Stack>
            </div>
          );
        })}
      </Stack>
    </div>
  );
}

export default memo(MyCategory);
