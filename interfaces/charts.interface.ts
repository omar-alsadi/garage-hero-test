export interface KPIProps {
  title: string;
  value: string | number;
  trend: string;
}

export interface SingleSeriesBarChartProps {
  data: { name: string; value: number }[];
  title: string;
  subtitle?: string;
  domain?: [number, number];
  colors?: { [key: string]: string }; // optional color map
}

export interface DualMetricBarChartProps {
  title?: string;
  leftKey: string;
  rightKey: string;
  leftLabel: string;
  rightLabel: string;
  leftColor?: string;
  rightColor?: string;
}
