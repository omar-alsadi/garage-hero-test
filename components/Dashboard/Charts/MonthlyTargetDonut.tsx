"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { FiEdit2 } from "react-icons/fi";
import { MonthlySalesdata } from "@/mockData/ChartsReport";
import { useEffect, useState } from "react";

const COLORS = ["#003865", "#DCE0EA"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded bg-gray-700 px-2 py-1 text-xs text-white shadow">
        X days more to generate <br />
        {`{Y Currency}`}
      </div>
    );
  }

  return null;
};

const MonthlyTargetDonut = () => {
  const [monthlySales, setMonthlySales] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
    fetch("/api/monthly-target", { credentials: "include" })
      .then((r) => r.json())
      .then((payload: any) => {
        Array.isArray(payload)
          ? setMonthlySales(payload)
          : console.error("unexpected:", payload);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="h-fit rounded-xl border bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase text-gray-500">
          Monthly Target
        </h2>
        <FiEdit2 className="cursor-pointer text-gray-400 hover:text-gray-600" />
      </div>

      {/* Donut Chart */}
      <div className="relative mx-auto size-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={MonthlySalesdata}
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              {MonthlySalesdata.map((_, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Centered Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-gray-900">80%</span>
          <span className="text-sm text-gray-500">Reached</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <span className="inline-block size-3 rounded-full bg-[#003865]"></span>
          <span>Target reached</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-block size-3 rounded-full bg-[#00BCD4]"></span>
          <span>Days to go</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyTargetDonut;
