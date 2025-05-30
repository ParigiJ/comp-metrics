import { useState } from "react";

function EarningsTable({ earnings = [] }) {
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(earnings.length / rowsPerPage);

  const start = (page - 1) * rowsPerPage;
  const currentRows = earnings.slice(start, start + rowsPerPage);

  return (
    <div className="mt-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Fiscal Date Ending</th>
            <th className="border px-4 py-2 text-left">Reported EPS</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, idx) => (
            <tr
              key={start + idx}
              className={idx % 2 === 0 ? "bg-gray-200" : ""}
            >
              <td className="border px-4 py-2">{row.fiscalDateEnding}</td>
              <td className="border px-4 py-2">{row.reportedEPS}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-2">
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-300 hover:cursor-pointer disabled:hover:cursor-not-allowed"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          className="px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-300 hover:cursor-pointer disabled:hover:cursor-not-allowed"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default EarningsTable;
