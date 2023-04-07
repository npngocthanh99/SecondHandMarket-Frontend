import React, { useState } from "react";
// import "./styles/App.css";
import { Container, Box, Typography, makeStyles } from "@material-ui/core";
import { CircularProgress } from "@mui/material";

const useStyles = makeStyles({
  mainBox: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  mybox: {
    backgroundColor: "#9fa8da",
    padding: "40px",
    color: "#fff",
    maxWidth: 300,
  },
  active: {
    backgroundColor: "red",
  },
});

function MyTest() {
  const clasess = useStyles();

  const [active, setActive] = useState("");

  const mydata = [
    {
      id: 1,
      name: "Ganesh",
      des: "UI Developer",
    },
    {
      id: 2,
      name: "Suresh",
      des: "Accountant",
    },
    {
      id: 3,
      name: "Srikanth",
      des: "Digital",
    },
  ];

  const onClick = (id) => {
    setActive(id);
  };

  return (
    <Container>
      <Box className={clasess.mainBox}>
        {mydata.map((val, index) => {
          console.log("index::::", index);
          return (
            <>
              <Box
                boxShadow={1}
                key={index}
                onClick={() => {
                  console.log("val.id::", val.id);
                  setActive(val.id);
                }}
                className={
                  val.id === active ? clasess.active : clasess.deactive
                }
              >
                <Typography variant="h4">{val.name}</Typography>
                <Typography>{val.des}</Typography>
              </Box>
            </>
          );
        })}
      </Box>
      <CircularProgress style={{ color: "red" }} />
    </Container>
  );
}

export default MyTest;
