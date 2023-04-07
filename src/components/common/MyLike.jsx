import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyLike({ postId }) {
  const [like, setLike] = useState(false);

  const navigate = useNavigate();

  //Like Post
  const likePost = async (postId) => {
    try {
      if (!localStorage["access_token"]) {
        localStorage.setItem("page_url", window.location.href);
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "/user/likePost",
          {
            postId,
          },
          {
            headers: {
              Authorization: localStorage["access_token"],
            },
          }
        );

        console.log("like:::", data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //unlikePost
  const unlikePost = async (postId) => {
    try {
      if (!localStorage["access_token"]) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "/user/unlikePost",
          {
            postId,
          },
          {
            headers: {
              Authorization: localStorage["access_token"],
            },
          }
        );

        console.log("unlike:::", data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //getCurrent Like Post
  const getCurrentLikePost = async () => {
    try {
      if (localStorage["access_token"] === undefined) {
        setLike(false);
      } else {
        const { data } = await axios.get(`/user/currentLikePost/${postId}`, {
          headers: {
            Authorization: localStorage["access_token"],
          },
        });
        if (data.data === null) {
          setLike(false);
        } else {
          setLike(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentLikePost();
  }, []);

  return (
    <div>
      {like ? (
        <IconButton
          onClick={() => {
            setLike(false);
            unlikePost(postId);
          }}
        >
          <ThumbUpAltIcon fontSize="large" style={{ fill: "#7b35ba" }} />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            setLike(true);
            likePost(postId);
          }}
        >
          <ThumbUpAltIcon fontSize="large" style={{ fill: "white" }} />
        </IconButton>
      )}
    </div>
  );
}

export default MyLike;
