export type FinancialPayload = {
  stats?: Record<string, number | string>;
  financials?: {
    revenue: number;
    expenses: number;
    stock_value: number;
    profit_distribution: Record<string, number>;
  };
  change?: Record<string, number>;
  period?: { start: string; end: string };
};
