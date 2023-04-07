import { Box, Grid } from "@material-ui/core";
import { Stack } from "@mui/system";
import React from "react";
import useWindowDimensions from "../../helps/useWindowDimensions";

function MyFooter() {
  const { height, width } = useWindowDimensions();

  return (
    <Grid container justifyContent="center" style={{ paddingTop: 14 }}>
      <Grid item xs={12}>
        <div
          style={{
            backgroundColor: "white",
            width: width,
            maxHeight: height / 4,
            bottom: 0,
          }}
        >
          <div
            style={{
              backgroundImage:
                "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
              // width: width,
              height: 12,
            }}
          ></div>
          <Grid container justifyContent="center">
            <Grid item xs={6}>
              <div style={{ paddingTop: 8 }}>
                <Stack direction="column" justifyContent="center" spacing={1}>
                  <div
                    style={{
                      textAlign: "center",
                      color: "black",
                      fontSize: 20,
                    }}
                  >
                    Second-hand Market
                  </div>
                  {/* <div style={{ textAlign: "center", color: "black" }}>
                    Second-hand Market
                  </div> */}
                  <div style={{ textAlign: "center" }}>
                    <Stack direction="row" justifyContent="center" spacing={4}>
                      <div>
                        <img
                          alt=""
                          src="https://img.icons8.com/color/24/000000/facebook-new.png"
                        />
                      </div>
                      <div>
                        <img
                          alt=""
                          src="https://img.icons8.com/fluency/24/000000/instagram-new.png"
                        />
                      </div>
                      <div>
                        <img
                          alt=""
                          src="https://img.icons8.com/color/24/000000/twitter--v1.png"
                        />
                      </div>
                    </Stack>
                  </div>
                  <div
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                      color: "black",
                      paddingBottom: 8,
                    }}
                  >
                    Product by Nhóm 5 &reg; {new Date().getFullYear()}
                  </div>
                </Stack>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

export default MyFooter;
