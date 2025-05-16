"use client";
import { useEffect, useState } from "react";
import { DualMetricBarChartProps } from "@/interfaces/charts.interface";
import { Dropdown } from "flowbite-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function DualMetricBarChart({
  title = "",
  leftKey,
  rightKey,
  leftLabel,
  rightLabel,
  leftColor = "#3b82f6",
  rightColor = "#06b6d4",
}: DualMetricBarChartProps) {
  const [data, setData] = useState<any[]>([]);
  const [period, setPeriod] = useState<
    "last month" | "last 3 months" | "last 6 months" | "last year"
  >("last 6 months");

  // derive totals + profit + rate
  const totalLeft = data.reduce((sum, x) => sum + (x[leftKey] || 0), 0);
  const totalRight = data.reduce((sum, x) => sum + (x[rightKey] || 0), 0);
  const profit = totalLeft - totalRight;
  const rateNum = totalLeft > 0 ? (profit / totalLeft) * 100 : 0;
  const profitRate = Math.abs(rateNum).toFixed(1);

  useEffect(() => {
    fetch(`/api/financial-summary?period=${encodeURIComponent(period)}`, {
      credentials: "include",
    })
      .then(async (r) => {
        if (!r.ok) {
          const err = await r.json().catch(() => ({}));
          console.error("summary error", r.status, err);
          return [];
        }
        return r.json();
      })
      .then((body) => {
        setData(body.monthly_data || []);
      })
      .catch((e) => console.error("fetch error", e));
  }, [period]);

  // badge for profit-rate
  let rateBadge;
  if (rateNum > 0) {
    rateBadge = (
      <span className="inline-flex items-center rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
        ↑ {profitRate}%
      </span>
    );
  } else if (rateNum < 0) {
    rateBadge = (
      <span className="inline-flex items-center rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
        ↓ {profitRate}%
      </span>
    );
  } else {
    rateBadge = <span className="text-xs text-gray-500">0%</span>;
  }

  return (
    <div className="w-full rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-900 md:w-[65%]">
      <div className="silver_bottom_border mb-2 flex items-start justify-between pb-2">
        <div>
          <p className="text-sm font-light text-gray-500">Profit</p>
          <h2 className="text-2xl font-bold">${profit.toLocaleString()}</h2>
        </div>
        {rateBadge}
      </div>

      <div className="mb-5 flex flex-col gap-8 text-sm text-gray-500 sm:flex-row">
        <div className="w-1/2">
          <p className="mb-1 font-light">{leftLabel}</p>
          <p className="text-lg font-semibold text-blue-600">
            ${totalLeft.toLocaleString()}
          </p>
        </div>
        <div className="w-1/2">
          <p className="mb-1 font-light">{rightLabel}</p>
          <p className="text-lg font-semibold text-cyan-600">
            ${totalRight.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 30, left: 30, bottom: 0 }}
            barCategoryGap="20%"
          >
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fill: "#6b7280" }} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            {/* 1) format tooltip values to one decimal place  */}
            <Tooltip formatter={(value: number) => value.toFixed(1)} />
            <Bar
              dataKey={leftKey}
              fill={leftColor}
              barSize={14}
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey={rightKey}
              fill={rightColor}
              barSize={14}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <Dropdown label={period} inline onSelect={(v) => setPeriod(v as any)}>
          <Dropdown.Item>last month</Dropdown.Item>
          <Dropdown.Item>last 3 months</Dropdown.Item>
          <Dropdown.Item>last 6 months</Dropdown.Item>
          <Dropdown.Item>last year</Dropdown.Item>
        </Dropdown>

        <a href="#" className="font-medium text-blue-600 hover:underline">
          {title.toUpperCase() || "DOWNLOAD"} REPORT &rarr;
        </a>
      </div>
    </div>
  );
}
