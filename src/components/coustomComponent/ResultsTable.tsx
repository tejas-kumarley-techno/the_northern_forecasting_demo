import { AnalysisResult } from "@/types";
import React, { useState, useMemo } from "react";


interface ResultsTableProps {
  results: AnalysisResult[];
}

type SortDirection = "asc" | "desc";

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState("");
  const itemsPerPage = 20;

  const columns = useMemo(() => {
    if (results.length === 0) return [];
    return Object.keys(results[0]);
  }, [results]);

  const filteredAndSortedResults = useMemo(() => {
    let filtered = results.filter((row) => {
      if (!filterText) return true;
      return Object.values(row).some((value) =>
        String(value).toLowerCase().includes(filterText.toLowerCase())
      );
    });

    if (sortColumn) {
      filtered.sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        if (aVal === bVal) return 0;
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        const comparison = aVal < bVal ? -1 : 1;
        return sortDirection === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [results, filterText, sortColumn, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedResults.length / itemsPerPage);
  const paginatedResults = filteredAndSortedResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const isWarningRow = (row: AnalysisResult) => {
    return Object.values(row).some(
      (value) =>
        String(value).toLowerCase().includes("warning") ||
        String(value).toLowerCase().includes("error") ||
        String(value).toLowerCase().includes("fail")
    );
  };

  if (results.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 italic">
        No results to display
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Filter results..."
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm min-w-[200px] focus:outline-none focus:ring focus:ring-blue-100"
        />
        <div className="text-sm text-gray-600">
          Showing {filteredAndSortedResults.length} of {results.length} results
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-800">
              {columns.map((column) => (
                <th
                  key={column}
                  onClick={() => handleSort(column)}
                  className="px-4 py-3 font-semibold border-b border-gray-200 cursor-pointer select-none hover:bg-gray-200"
                >
                  {column}
                  {sortColumn === column && (
                    <span className="ml-1 text-blue-500">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedResults.map((row, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 ${
                  isWarningRow(row)
                    ? "bg-yellow-100 hover:bg-yellow-200"
                    : "hover:bg-gray-50"
                }`}
              >
                {columns.map((column) => (
                  <td key={column} className="px-4 py-3 break-words">
                    {row[column] !== null && row[column] !== undefined
                      ? String(row[column])
                      : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200 flex justify-center items-center gap-4 text-sm">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
