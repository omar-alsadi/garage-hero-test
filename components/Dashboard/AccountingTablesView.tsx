import GenericPaginatedTable from "./Tables/PaginatedTable";

export const runtime = "nodejs";

const AccountingTablesView = async () => {
  return (
    <>
      {
        <GenericPaginatedTable
          title="Invoices"
          columns={[
            { key: "id", label: "ID" },
            { key: "customer", label: "Customer Name" },
            { key: "description", label: "Description" },
            { key: "type", label: "Type" },
            { key: "date", label: "Date" },
            { key: "amount", label: "Amount" },
            { key: "status", label: "Status" },
            { key: "method", label: "Payment Method" },
          ]}
          data={[]}
        />
      }
      {
        <GenericPaginatedTable
          title="Receipts"
          columns={[
            { key: "id", label: "ID" },
            { key: "customer", label: "Customer Name" },
            { key: "description", label: "Description" },
            { key: "type", label: "Type" },
            { key: "date", label: "Date" },
            { key: "amount", label: "Amount" },
            { key: "status", label: "Status" },
            { key: "method", label: "Payment Method" },
          ]}
          data={[]}
        />
      }

      {
        <GenericPaginatedTable
          title="Inventory"
          columns={[
            { key: "id", label: "ID" },
            { key: "customer", label: "Customer Name" },
            { key: "description", label: "Description" },
            { key: "type", label: "Type" },
            { key: "date", label: "Date" },
            { key: "amount", label: "Amount" },
            { key: "status", label: "Status" },
            { key: "method", label: "Payment Method" },
          ]}
          data={[]}
        />
      }
    </>
  );
};

export default AccountingTablesView;
