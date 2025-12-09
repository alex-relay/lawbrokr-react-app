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
    <div className="flex-1 rounded-sm border border-1 border-solid border-[var(--color-my-brand-primary)]/50 p-4">
      <Chart
        type="line"
        options={{
          colors: ["#250D53"],
          chart: {
            id: "basic-line",
          },
          xaxis: {
            categories:
              priceData?.map((data) =>
                new Date(data[0]).toLocaleDateString(),
              ) || [],
            tickAmount: 10,
            decimalsInFloat: 1,
            labels: {
              style: {
                colors: "#250D53",
              },
            },
            title: {
              text: "Date",
              style: {
                color: "#250D53",
              },
            },
          },
          yaxis: {
            title: {
              text: "Price",
              style: {
                color: "#250D53",
              },
            },
            labels: {
              style: {
                colors: "#250D53",
              },
            },
          },
          title: {
            text: "BTC Price Over 30 days",
            style: {
              color: "#250D53",
            },
          },
        }}
        series={[
          {
            name: "BTC Price",
            data: priceData?.map((data) => Number(data[4])) || [],
          },
        ]}
        width={"100%"}
      />
    </div>
  );
};

export default CryptoPrice;
