import { Fullscreen } from "@mui/icons-material";
import SimpleImageSlider from "react-simple-image-slider";
import useWindowDimensions from "../../helps/useWindowDimensions";

const images = [
  {
    url: "/upload/thumbnail1.jpg",
  },
  {
    url: "/upload/thumbnail2.png",
  },
];

const MyThumbnailAds = () => {
  const { height, width } = useWindowDimensions();

  return (
    <div>
      <div>
        <div style={{ justifyContent: "center" }}>
          <SimpleImageSlider
            autoPlay="true"
            width={(width * 8) / 12 - 10}
            height={(height * 2) / 5}
            images={images}
            showBullets={false}
            showNavs={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MyThumbnailAds;
