"use client";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

// temp
const mockChartData = [
  { value: 50 },
  { value: 80 },
  { value: 60 },
  { value: 90 },
  { value: 75 },
  { value: 65 },
  { value: 85 },
];

const MetricCard = ({
  title,
  value,
  trend,
  trendColor,
}: {
  title: string;
  value: string;
  trend: string;
  trendColor: string;
}) => (
  <div className="my-3 border-r border-gray-200 p-4">
    <div className="mb-2 flex items-center justify-between">
      <h4 className="text-sm font-light text-gray-500">{title}</h4>
      <span
        className={`rounded px-2 py-0.5 text-xs ${
          trendColor === "red"
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        {trend}
      </span>
    </div>
    <h3 className="text-2xl font-bold">{value}</h3>

    <div className="mt-3 h-20">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={value ? mockChartData : []}>
          <defs>
            <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorMetric)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default MetricCard;
