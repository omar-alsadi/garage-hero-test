import { Datepicker } from "flowbite-react";
import KPIBox from "./Charts/KPIBox";
import MetricCard from "./Charts/MetricCard";
import StatSummary from "./Charts/StatSummary";
import getFinancialReport from "@/helpers/getFinancialReport";

const FinancialSummaryReport = async () => {
  const apiKey = process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY!;

  const { kpiData, metricData, statData, period } =
    await getFinancialReport(apiKey);

  return (
    <div className="mt-2 w-full space-y-6 rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-900">
      <div className="flex flex-wrap items-start justify-between">
        <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {kpiData.map((item, idx) => (
            <KPIBox key={idx} {...item} />
          ))}
        </div>
        <div className="mt-4 w-full sm:mt-0 sm:w-auto md:min-w-[30%]">
          <Datepicker className="float-right flex items-center gap-2 px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 border-y border-gray-200 md:grid-cols-4">
        {metricData.map((item, idx) => (
          <MetricCard key={idx} {...item} />
        ))}

        <div className="mb-4 p-4">
          <div className="mb-5 flex items-center justify-between text-sm">
            {statData.map((item, idx) => (
              <StatSummary key={idx} {...item} />
            ))}
          </div>

          <div className="flex h-4 w-full overflow-hidden rounded bg-gray-200">
            {statData.map((item, idx) => {
              const pct = Number(item.percent.replace("%", "")) || 0;
              // pick color by index (or item.label)
              const bgColor =
                idx === 0
                  ? "bg-blue-600"
                  : idx === 1
                    ? "bg-cyan-400"
                    : "bg-red-500";
              return (
                <div
                  key={idx}
                  className={bgColor}
                  style={{ width: `${pct}%` }}
                />
              );
            })}
          </div>

          <div className="mx-auto mt-4 flex w-full items-center justify-center space-x-6 text-sm text-gray-500">
            {statData.map((item, idx) => {
              const dotColor =
                idx === 0
                  ? "bg-blue-600"
                  : idx === 1
                    ? "bg-cyan-400"
                    : "bg-red-600";
              return (
                <div key={idx} className="flex items-center space-x-1">
                  <span
                    className={`inline-block h-3 w-3 rounded-full ${dotColor}`}
                  />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button className="mt-4 rounded border px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
        View Financials reports
      </button>
    </div>
  );
};

export default FinancialSummaryReport;
