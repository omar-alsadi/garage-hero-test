export interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface GenericPaginatedTableProps {
  columns: TableColumn[];
  data: any[];
  title: string;
  rowsPerPage?: number;
}
