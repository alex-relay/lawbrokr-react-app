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
  const { data: priceData, isLoading } = useGetBTCPriceWithInterval(
    ["scatter-plot", "180d"],
    undefined,
    "180",
  );

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
    <div className="flex-1 rounded-sm border border-1 border-solid border-[var(--color-my-brand-primary)]/50 p-4">
      <Chart
        type="scatter"
        options={{
          colors: ["#250D53"],
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
              style: {
                color: "#250D53",
              },
            },
            labels: {
              style: {
                colors: ["#250D53"],
              },
            },
          },
          yaxis: {
            decimalsInFloat: 2,
            stepSize: 2,
            title: {
              text: "Price Change %",
              style: {
                color: "#250D53",
              },
            },
            labels: {
              style: {
                colors: ["#250D53"],
              },
            },
          },
          title: {
            text: "Volume-Volatility Correlation",
            style: {
              color: "#250D53",
            },
          },
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
