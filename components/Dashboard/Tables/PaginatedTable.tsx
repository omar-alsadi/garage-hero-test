"use client";
import { useState } from "react";
import { Table, Button, Pagination, TextInput } from "flowbite-react";
import { HiRefresh, HiSearch } from "react-icons/hi";
import { GenericPaginatedTableProps } from "@/interfaces/tabels.interface";
import { RiFileTransferFill } from "react-icons/ri";
import { FaFilter } from "react-icons/fa";

export default function GenericPaginatedTable({
  columns,
  data,
  title,
  rowsPerPage = 5,
}: GenericPaginatedTableProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const filteredData = data.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase()),
  );

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="w-full rounded-xl border bg-white p-4 shadow-sm dark:bg-gray-900">
      {/* Header */}
      <div className="my-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h2>
        <div className="flex items-center gap-4">
          <Button color="gray" className="flex items-center gap-2">
            <HiRefresh className="mr-1 text-lg" />
            Refresh
          </Button>
          <Button color="gray" className="flex items-center gap-2">
            <RiFileTransferFill className="mr-1 text-lg" />
            Export
          </Button>
        </div>
      </div>

      <div className="mb-8 flex">
        <div className="relative mr-3 flex w-[400px]">
          <TextInput
            icon={HiSearch}
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            style={{ width: "400px" }}
          />
          <Button className="input_w_filter_btn mb-5">Search</Button>
        </div>
        <Button color="gray">
          <FaFilter className="mr-1 text-lg" />
          Filters
        </Button>
      </div>

      {/* Table */}
      <Table hoverable striped className="mb-8">
        <Table.Head>
          {columns.map((col) => (
            <Table.HeadCell key={col.key} className="text-gray-500">
              <span>{col.label}</span>
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body>
          {paginatedData.map((row, idx) => (
            <Table.Row key={idx}>
              {columns.map((col) => (
                <Table.Cell key={col.key} className="text-black">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-black">
            {1 + (page - 1) * rowsPerPage} -{" "}
            {Math.min(page * rowsPerPage, filteredData.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-black">
            {filteredData.length}
          </span>
        </p>
        <Pagination
          currentPage={page}
          totalPages={totalPages + 100} // mocking the pagination UI for test, remove "+ 1" later
          onPageChange={(p) => setPage(p)}
          showIcons
          previousLabel={""}
          nextLabel={""}
        />
      </div>
    </div>
  );
}
