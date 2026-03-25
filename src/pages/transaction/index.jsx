// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { Icon } from "@iconify/react";
import DeftInput from "../../components/deftInput/deftInput";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionList } from "../../store/slice/onBoardingSlice";

// const transactionSeed = [
//   {
//     id: "TXN-10001",
//     planName: "Company Growth",
//     purchasedBy: "Acme Hiring Pvt Ltd",
//     purchaserType: "Company",
//     category: "Company Plans",
//     purchaseDate: "2026-01-10",
//     invoiceId: "INV-9001"
//   },
//   {
//     id: "TXN-10002",
//     planName: "Student Explorer",
//     purchasedBy: "Priya Sharma",
//     purchaserType: "Student",
//     category: "Student Plans",
//     purchaseDate: "2026-01-12",
//     invoiceId: "INV-9002"
//   },
//   {
//     id: "TXN-10003",
//     planName: "AI Mentor Power",
//     purchasedBy: "Rahul Verma",
//     purchaserType: "Student",
//     category: "On Demand",
//     purchaseDate: "2026-01-14",
//     invoiceId: "INV-9003"
//   },
//   {
//     id: "TXN-10004",
//     planName: "Company Enterprise",
//     purchasedBy: "Nimbus Talent Labs",
//     purchaserType: "Company",
//     category: "Company Plans",
//     purchaseDate: "2026-01-16",
//     invoiceId: "INV-9004"
//   },
//   {
//     id: "TXN-10005",
//     planName: "On-demand tests",
//     purchasedBy: "Ananya Singh",
//     purchaserType: "Student",
//     category: "On Demand",
//     purchaseDate: "2026-01-20",
//     invoiceId: "INV-9005"
//   }
// ];

const filters = [
  "All",
  "Company Plans",
  "Student Plans",
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
  const dispatch = useDispatch();

  // 1. Grab transactionList from your Redux state
  const { transactionList = [] } = useSelector(
    (state) => state.onBoarding || {}

  );
  const [searchData, setSearchData] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // 2. API Call Arrangement
  const fetchTransactionData = () => {
    let data = {
      language: "en",
    };
    dispatch(getTransactionList(data));
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const searchTerm = searchData.trim().toLowerCase();

  const filteredTransactions = useMemo(() => {
    if (!Array.isArray(transactionList)) return [];

    // ✅ Normalize FIRST
    const normalizedList = transactionList.map((txn) => ({
      transaction_id: txn.transaction_id,
      plan_name: txn.plan_name,
      user_name: txn.user_name,
      user_type: txn.user_type,
      plan_type: txn.plan_type,
      purchase_date: txn.purchase_date,
      amount: txn.amount,
      invoice_url: txn.invoice_url,
    }));

    return normalizedList.filter((txn) => {
      const matchesCategory =
        categoryFilter === "All" ||
        (categoryFilter === "Company Plans" && txn.user_type === "company") ||
        (categoryFilter === "Student Plans" && txn.user_type === "student") ||
        (categoryFilter === "On Demand" && txn.plan_type === "ai_mentor_pack");

      if (!matchesCategory) return false;

      // Search filter
      if (!searchTerm) return true;

      const haystack = [
        txn.transaction_id,
        txn.plan_name,
        txn.user_name,
        txn.user_type,
        txn.plan_type,
        txn.amount,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(searchTerm);
    });
  }, [transactionList, categoryFilter, searchTerm]);

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
            <button type="button" className="btn btn-dark d-flex align-items-center gap-2" onClick={handleExportCsv}>
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
                <option key={filter} value={filter}>{filter}</option>
              ))}
            </Form.Select>
          </div>
        </div>
      </div>

      <div className="container pb-4">
        <div className="table-responsive text-nowrap">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Transaction Id</th>
                <th>Company Name</th>
                <th>Plan Name</th>
                <th>User Type</th>
                <th>Purchase Date</th>
                <th>Amount</th>
                <th>Download Invoice</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {filteredTransactions.map((txn) => (
                <tr key={txn.transaction_id}>
                  <td className="fw-semibold">{txn.transaction_id}</td>
                  <td>{txn.user_name}</td>
                  {/* Plan Name */}
                  <td>{txn.plan_name}</td>
                  {/* Purchased By & User Type */}
                  <td> {txn.user_type}</td>
                  {/* Purchase Date (Formatted) */}
                  <td>{formatDate(txn.purchase_date)}</td>
                  <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-indian-rupee-icon lucide-indian-rupee"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></svg>
                  {txn.amount}</td>
                  {/* Download Invoice Action */}
                  <td>
                    {txn.invoice_url ? (
                      <a
                        href={txn.invoice_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-dark d-inline-flex align-items-center gap-1"
                      >
                        <Icon icon="bx:file" height={16} /> Invoice
                      </a>
                    ) : (
                      <span className="text-muted small">Not Available</span>
                    )}
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