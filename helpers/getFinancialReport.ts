import { cookies } from "next/headers";

const getFinancialReport = async (apiKey: string) => {
  const cookieStore = cookies();
  let token = cookieStore.get("token")?.value || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/dashboard/accountant`,
    {
      headers: { accept: "application/json", token, api_key: apiKey },
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) console.error("Failed to load data");
  const payload = await res.json();

  // 1) KPI slots
  const KPI_SLOTS = [
    { key: "outstanding_invoices", label: "Outstanding Invoices" },
    { key: "average_collection_period", label: "Average Collection Period" },
    { key: "gross_profit_margin", label: "Gross Profit Margin" },
    { key: "inventory_turnover", label: "Inventory Turnover" },
    { key: "online_payments", label: "Online Payments" },
  ];

  const stats = payload.stats ?? {};
  const change = payload.change ?? {};
  const formatValue = (key: string, v: any) => {
    if (v == null) return key.includes("period") ? "00:00" : "0";
    if (key === "gross_profit_margin") return `${(v / 1000).toFixed(1)}k`;
    if (key === "online_payments") return `${v}%`;
    return String(v);
  };

  const kpiData = KPI_SLOTS.map(({ key, label }) => ({
    title: label,
    value: formatValue(key, stats[key]),
    trend: `${(change[key] ?? 0).toFixed(1)}%`,
  }));

  // 2) Metric slots
  const METRIC_SLOTS = [
    { key: "revenue", label: "Revenue" },
    { key: "expenses", label: "Expenses" },
    { key: "stock_value", label: "Stock value" },
  ];
  const financials = payload.financials ?? {
    revenue: 0,
    expenses: 0,
    stock_value: 0,
    profit_distribution: {},
  };

  const metricData = METRIC_SLOTS.map(({ key, label }) => {
    const raw = financials[key] ?? 0;
    const pct = change[key] ?? 0;
    return {
      title: label,
      value: `$${(raw / 1000).toFixed(1)}k`,
      trend: `${pct.toFixed(1)}%`,
      trendColor: pct < 0 ? "red" : "green",
    };
  });

  // 3) Stat summary slots
  const DIST = financials.profit_distribution ?? {};
  const STAT_SLOTS = [
    { key: "profit", icon: "/images/icons/cart-outline.svg" },
    { key: "expenses", icon: "/images/icons/list-outline.svg" },
    { key: "assets", icon: "/images/icons/tag-outline.svg" },
  ];
  const statData = STAT_SLOTS.map(({ key, icon }) => {
    const pct = DIST[key] ?? 0;
    // compute absolute from revenue×pct if you like
    const amount = ((financials.revenue ?? 0) * pct) / 100;
    return {
      icon,
      label: key[0].toUpperCase() + key.slice(1),
      percent: `${pct}%`,
      amount: `$${amount.toLocaleString()}`,
    };
  });

  return { kpiData, metricData, statData, period: payload.period };
};

export default getFinancialReport;
