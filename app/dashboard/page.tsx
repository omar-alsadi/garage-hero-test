import AccountingTablesView from "@/components/Dashboard/AccountingTablesView";
import DualMetricBarChart from "@/components/Dashboard/Charts/DualMetricBarChart";
import MonthlyTargetDonut from "@/components/Dashboard/Charts/MonthlyTargetDonut";
import SingleSeriesBarChart from "@/components/Dashboard/Charts/SingleSeriesBarChart";
import FinancialSummaryReport from "@/components/Dashboard/FinancialSummaryReport";
import SideNav from "@/components/Navs/SideNav";
import { PayablesAndReceivables } from "@/mockData/ChartsReport";

const Dashboard = async () => {
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formatted = today.toLocaleDateString("en-US", options);
  const finalFormat = formatted.replace(",", "").replace(" ", ", ");

  return (
    <div className="flex">
      <SideNav />
      <div className="dashboard_container">
        <div className="welcoming_text mb-8">
          <h3>Welcome Omar!</h3>
          <span className="text-gray-500">{finalFormat}</span>
        </div>
        <FinancialSummaryReport />
        <DualMetricBarChart
          title="Renevue"
          leftKey="sales"
          rightKey="expenses"
          leftLabel="Sales"
          rightLabel="Expenses"
        />
        <div className="flex gap-2 md:w-1/3 md:flex-col">
          <MonthlyTargetDonut />
          <SingleSeriesBarChart
            title="Payables and Receivables"
            subtitle="for this month"
            data={PayablesAndReceivables}
            colors={{
              Receivables: "#10B981",
              Payables: "#EF4444",
            }}
          />
        </div>
        <AccountingTablesView />
      </div>
    </div>
  );
};

export default Dashboard;
