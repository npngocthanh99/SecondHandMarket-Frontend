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

export default function MyUserChart() {
  const { width } = useWindowDimensions();
  const [data, setData] = useState([]);

  const getUsersByMonths = async () => {
    try {
      const { data } = await axios.get("/admin/chart/user");
      setData(data.data);
    } catch (error) {
      console.log("getUsersByMonth", error);
    }
  };

  useEffect(() => {
    getUsersByMonths();
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
        dataKey="Tài khoản"
        stroke="#897D08"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
