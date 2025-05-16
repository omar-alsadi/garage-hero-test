import { KPIProps } from "@/interfaces/charts.interface";
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";

const KPIBox = ({ title, value, trend }: KPIProps) => {
  const numericTrend = parseFloat(trend.replace("%", "")) || 0;

  // choose colors & arrow
  const isPositive = numericTrend > 0;
  const isNegative = numericTrend < 0;
  const bgColor = isPositive
    ? "bg-green-100 text-green-600"
    : isNegative
      ? "bg-red-100 text-red-600"
      : "bg-gray-100 text-gray-600";

  return (
    <div className="space-y-1">
      <p className="truncate text-sm font-light text-gray-500">{title}</p>
      <div className="flex items-center">
        <h3 className="mr-2 text-xl font-semibold">{value}</h3>
        <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-600">
          {isPositive && <HiArrowSmUp className="mr-1 inline-block" />}
          {isNegative && <HiArrowSmDown className="mr-1 inline-block" />}
          {Math.abs(numericTrend)}%
        </span>
      </div>
      <p className="text-xs font-light text-gray-400">vs last month</p>
    </div>
  );
};

export default KPIBox;
