"use client";
import { SingleSeriesBarChartProps } from "@/interfaces/charts.interface";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

export default function SingleSeriesBarChart({
  data,
  title,
  subtitle = "",
  domain = [0, 130],
  colors = {
    Receivables: "#10B981",
    Payables: "#EF4444",
  },
}: SingleSeriesBarChartProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-900">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold uppercase text-gray-700">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm font-light text-gray-500">{subtitle}</p>
        )}
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#4b5563", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#4b5563", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={domain}
            />
            <Tooltip />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              barSize={40}
              fill="#3b82f6"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[entry.name] || "#3b82f6"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
