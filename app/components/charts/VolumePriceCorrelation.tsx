"use client";

import { useMemo } from "react";
import { useGetBTCPriceWithInterval } from "../../api/api";
import Chart from "./chart";

type VolumePriceCorrelationDataPoint = {
  priceDifference: number;
  volume: number;
};

const calculatePercentDifference = (high: number, low: number) => {
  return ((high - low) / low) * 100;
};

const VolumePriceCorrelation = () => {
  const {
    data: priceData,
    isLoading,
    isError,
  } = useGetBTCPriceWithInterval(["scatter-plot", "180d"], undefined, "180");

  const percentDifferencesBetweenPrices: VolumePriceCorrelationDataPoint[] =
    useMemo(() => {
      return (
        priceData
          ?.map((data) => {
            const highPrice = parseFloat(data[2]);
            const lowPrice = parseFloat(data[3]);
            return {
              priceDifference: calculatePercentDifference(highPrice, lowPrice),
              volume: parseFloat(data[5]),
            };
          })
          .sort((a, b) => a.volume - b.volume) || []
      );
    }, [priceData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 rounded-sm border border-solid p-4">
      <Chart
        type="scatter"
        options={{
          chart: {
            id: "basic-scatter",
          },
          xaxis: {
            categories: percentDifferencesBetweenPrices.map(
              (item) => item.volume,
            ),
            tickAmount: 18,
            title: {
              text: "Volume",
            },
          },
          yaxis: {
            decimalsInFloat: 2,
            stepSize: 2,
            title: {
              text: "Price Change %",
            },
          },
          title: { text: "Volume-Volatility Correlation" },
        }}
        series={[
          {
            name: "BTC Price Change %",
            data: percentDifferencesBetweenPrices.map(
              (item) => item.priceDifference,
            ),
          },
        ]}
      />
    </div>
  );
};

export default VolumePriceCorrelation;
