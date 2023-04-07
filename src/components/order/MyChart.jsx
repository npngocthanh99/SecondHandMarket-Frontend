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

// const data = [
//   {
//     name: "Tháng 1",
//     uv: 4000,
//     pv: 2400,
//     san: 1231,
//     vu: 1231,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     san: 1111,
//     vu: 1231,
//     // amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     san: 4111,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     linh: 3000,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

export default function MyChart() {
  const { width } = useWindowDimensions();
  const [data, setData] = useState([]);

  const getQtyPostsByMonths = async () => {
    try {
      const { data } = await axios.get("/user/chart/qtyPost", {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      console.log("getQtyMonth:::", data.data);
      setData(data.data);
    } catch (error) {
      console.log("getQtyPostsByMonths", error);
    }
  };

  useEffect(() => {
    getQtyPostsByMonths();
  }, []);

  return (
    <LineChart
      width={(width * 2) / 3 - 30}
      height={500}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line
        type="monotone"
        dataKey="Bài đăng"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      {/* <Line
        type="monotone"
        dataKey="san"
        stroke="#7b35ba"
        activeDot={{ r: 8 }}
      />
      <Line
        type="monotone"
        dataKey="vu"
        stroke="#7b35ba"
        activeDot={{ r: 8 }}
      /> */}
    </LineChart>
  );
}
