"use client";

import { useGetBTCPriceWithInterval } from "../../api/api";
import Chart from "./chart";

const CryptoPrice = () => {
  const {
    data: priceData,
    isLoading,
    error,
  } = useGetBTCPriceWithInterval(["line-chart", "30d"]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <Chart
      type="line"
      options={{
        chart: {
          id: "basic-line",
        },
        xaxis: {
          categories:
            priceData?.map((data) => new Date(data[0]).toLocaleDateString()) ||
            [],
          tickAmount: 10,
          decimalsInFloat: 1,
        },
        title: { text: "BTC Price Over 30 days" },
      }}
      series={[
        {
          name: "BTC Price",
          data: priceData?.map((data) => Number(data[4])) || [],
        },
      ]}
      width={"100%"}
    />
  );
};

export default CryptoPrice;
