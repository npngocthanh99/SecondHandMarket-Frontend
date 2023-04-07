import { Button, Grid } from "@material-ui/core";
import { TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyLoginAdminPage() {
  const [adminname, setAdminname] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleBtnSubmit = async () => {
    try {
      if (adminname === "" || password === "") {
        setMsg("Không được bỏ trống");
        return;
      }
      if (adminname === "manager" && password === "manager") {
        setMsg("");
        localStorage.setItem("admin_access_token", "ROLE_MANAGER");
        navigate("/admin");
        window.location.reload(false);
        return;
      }
      if (adminname === "admin" && password === "admin") {
        setMsg("");
        localStorage.setItem("admin_access_token", "ROLE_ADMIN");
        navigate("/admin");
        window.location.reload(false);
        return;
      }
      setMsg("Tài khoản admin không đúng");
    } catch (error) {}
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} style={{ backgroundColor: "red" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 12,
            padding: 40,
            backgroundColor: "#F1ECF5",
            boxShadow: "10px 10px 10px #DADADA",
          }}
        >
          <Stack direction="column" spacing={2}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ fontSize: 28 }}>Login</p>
            </div>
            <TextField
              fullWidth
              color="secondary"
              label="adminname"
              variant="outlined"
              size="small"
              style={{ width: 300 }}
              onChange={(e) => {
                setAdminname(e.target.value);
              }}
            />
            <TextField
              color="secondary"
              type="password"
              fullWidth
              label="password"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              size="small"
              style={{ backgroundColor: "#7b35ba", color: "white" }}
              onClick={handleBtnSubmit}
            >
              Đăng nhập
            </Button>
            {msg}
          </Stack>
        </div>
      </Grid>
    </Grid>
  );
}

export default MyLoginAdminPage;
