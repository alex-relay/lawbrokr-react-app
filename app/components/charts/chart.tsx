"use client";
import { Props as ReactChartProps } from "react-apexcharts";
import dynamic from "next/dynamic";

type ChartProps = {
  type: ReactChartProps["type"];
  series: ApexAxisChartSeries;
  options: ReactChartProps["options"];
  width?: ReactChartProps["width"];
};

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Chart = ({ type, series, options, width, ...rest }: ChartProps) => {
  if (!series || series.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <ApexChart
      options={options}
      series={series}
      type={type}
      width={width}
      {...rest}
    />
  );
};

export default Chart;
