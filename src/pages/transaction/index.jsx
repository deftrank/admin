// @ts-nocheck
import React, { useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import { Icon } from "@iconify/react";

import DeftInput from "../../components/deftInput/deftInput";

const transactionSeed = [
  {
    id: "TXN-10001",
    planName: "Company Growth",
    purchasedBy: "Acme Hiring Pvt Ltd",
    purchaserType: "Company",
    category: "Company Plans",
    purchaseDate: "2026-01-10",
    invoiceId: "INV-9001"
  },
  {
    id: "TXN-10002",
    planName: "Student Explorer",
    purchasedBy: "Priya Sharma",
    purchaserType: "Student",
    category: "Student Plans",
    purchaseDate: "2026-01-12",
    invoiceId: "INV-9002"
  },
  {
    id: "TXN-10003",
    planName: "AI Mentor Power",
    purchasedBy: "Rahul Verma",
    purchaserType: "Student",
    category: "On Demand",
    purchaseDate: "2026-01-14",
    invoiceId: "INV-9003"
  },
  {
    id: "TXN-10004",
    planName: "Company Enterprise",
    purchasedBy: "Nimbus Talent Labs",
    purchaserType: "Company",
    category: "Company Plans",
    purchaseDate: "2026-01-16",
    invoiceId: "INV-9004"
  },
  {
    id: "TXN-10005",
    planName: "On-demand tests",
    purchasedBy: "Ananya Singh",
    purchaserType: "Student",
    category: "On Demand",
    purchaseDate: "2026-01-20",
    invoiceId: "INV-9005"
  }
];

const filters = [
  "All",
  "Company Plans",
  "Student Plans",
  "On Demand"
];

const normalize = (value) => `${value || ""}`.toLowerCase();

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });
};

const toCsv = (rows) => {
  const header = [
    "Transaction Id",
    "Plan Name",
    "Purchase By",
    "Purchase Date",
    "Invoice Id",
    "Category"
  ];

  const escape = (value) => {
    const str = `${value ?? ""}`.replace(/"/g, '""');
    return `"${str}"`;
  };

  const lines = [header.map(escape).join(",")];
  rows.forEach((row) => {
    lines.push(
      [
        row.id,
        row.planName,
        row.purchasedBy,
        formatDate(row.purchaseDate),
        row.invoiceId,
        row.category
      ]
        .map(escape)
        .join(",")
    );
  });

  return lines.join("\n");
};

export const Transactions = () => {
  const [searchData, setSearchData] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const searchTerm = searchData.trim().toLowerCase();

  const filteredTransactions = useMemo(() => {
    return transactionSeed.filter((txn) => {
      const matchesCategory =
        categoryFilter === "All" || txn.category === categoryFilter;

      if (!matchesCategory) return false;

      if (!searchTerm) return true;

      const haystack = [
        txn.id,
        txn.planName,
        txn.purchasedBy,
        txn.category,
        txn.purchaserType,
        txn.invoiceId
      ]
        .map(normalize)
        .join(" ");

      return haystack.includes(searchTerm);
    });
  }, [categoryFilter, searchTerm]);

  const handleExportCsv = () => {
    const csv = toCsv(filteredTransactions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadInvoice = (txn) => {
    // Placeholder: replace with real invoice download when API is ready.
    // Keep it a no-op for now, but it gives a clear action point in UI.
    return txn;
  };

  return (
    <div className="card">
      <div className="p-3">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-center">
          <div>
            <h4 className="mb-1">Transactions</h4>
            <div className="text-muted small">
              Track purchases across company, student, and on-demand plans.
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row gap-2">
            <button
              type="button"
              className="btn btn-dark d-flex align-items-center gap-2"
              onClick={handleExportCsv}
            >
              <Icon icon="bx:download" height={18} />
              Export CSV
            </button>
          </div>
        </div>

        <div className="row g-3 mt-2">
          <div className="col-12 col-lg-6">
            <DeftInput
              placeholder="Search by transaction, plan, or purchaser"
              type="text"
              value={searchData}
              onchange={(value) => setSearchData(value)}
              leftIcon={<i className="bx bx-search"></i>}
            />
          </div>
          <div className="col-12 col-lg-3">
            <Form.Label className="form-label">Filter</Form.Label>
            <Form.Select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              {filters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="col-12 col-lg-3 d-flex align-items-end">
            <div className="text-muted small">
              Showing {filteredTransactions.length} transaction
              {filteredTransactions.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-4">
        <div className="table-responsive text-nowrap">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Transaction Id</th>
                <th>Plan Name</th>
                <th>Purchase By</th>
                <th>Purchase Date</th>
                <th>Download Invoice</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {filteredTransactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="fw-semibold">{txn.id}</td>
                  <td>{txn.planName}</td>
                  <td>
                    <div className="d-flex flex-column">
                      <span>{txn.purchasedBy}</span>
                      <span className="text-muted small">{txn.purchaserType}</span>
                    </div>
                  </td>
                  <td>{formatDate(txn.purchaseDate)}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1"
                      onClick={() => handleDownloadInvoice(txn)}
                    >
                      <Icon icon="bx:file" height={16} />
                      Invoice
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-muted">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
