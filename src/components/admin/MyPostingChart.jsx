import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import useWindowDimensions from "../../helps/useWindowDimensions";

export default function MyPostingChart() {
  const { width } = useWindowDimensions();
  const [data, setData] = useState([]);

  // const getPostingByMonths = async () => {
  //   try {
  //     const { data } = await axios.get("/admin/chart/posting");
  //     // setData(data.data);
  //     return data.data;
  //   } catch (error) {
  //     console.log("getUsersByMonth", error);
  //   }
  // };

  const getPostingSoldByMonths = async () => {
    try {
      const { data } = await axios.get("/admin/chart/postingSold/DELIVERED");
      setData(data.data);
      // return data.data;
    } catch (error) {
      console.log("getUsersByMonth", error);
    }
  };

  useEffect(() => {
    getPostingSoldByMonths();
  }, []);

  return (
    <LineChart
      width={(width * 5) / 12 - 40}
      height={400}
      data={data}
      margin={{
        // top: 10,
        // right: 20,
        left: -15,
        // bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Bài đăng"
        stroke="blue"
        activeDot={{ r: 8 }}
      />
      <Line
        type="monotone"
        dataKey="Đã bán"
        stroke="#7b35ba"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
