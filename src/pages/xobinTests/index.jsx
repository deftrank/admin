// @ts-nocheck
import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";

import ConfirmationModal from "../../components/confirmationModel/confirmation";

const seedTests = [
  { id: "XB-1001", name: "Frontend React Basics", type: "Proctored" },
  { id: "XB-1002", name: "Node.js Fundamentals", type: "Non-proctored" },
  { id: "XB-1003", name: "Data Structures - Level 1", type: "Proctored" },
  { id: "XB-1004", name: "SQL Screening Test", type: "Non-proctored" },
  { id: "XB-1005", name: "System Design Quick Check", type: "Proctored" }
];

export default function XobinTests() {
  const [tests] = useState(seedTests);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const apiHits = useMemo(() => tests.length + 1, [tests.length]);

  const dialogData = useMemo(
    () => ({
      title: "Fetch Xobin Tests",
      message: `This will trigger approximately ${apiHits} API hits (${tests.length} tests + 1 sync call). Proceed?`
    }),
    [apiHits, tests.length]
  );

  const handleFetchConfirm = () => {
    // Placeholder: hook this into the real fetch/sync action later.
    setConfirmOpen(false);
  };

  return (
    <>
      <div className="card">
        <div className="p-3 d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center">
          <div>
            <h4 className="mb-1">Xobin Tests / Assessments</h4>
            <div className="text-muted small">
              Manage synced Xobin test catalog for company inquiries.
            </div>
          </div>
          <button
            type="button"
            className="btn btn-dark d-flex align-items-center gap-2"
            onClick={() => setConfirmOpen(true)}
          >
            <Icon icon="bx:cloud-download" height={18} />
            Fetch Xobin Test
          </button>
        </div>

        <div className="container pb-4">
          <div className="table-responsive text-nowrap">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Test ID</th>
                  <th>Test Name</th>
                  <th>Test Type</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {tests.map((test) => (
                  <tr key={test.id}>
                    <td className="fw-semibold">{test.id}</td>
                    <td>{test.name}</td>
                    <td>
                      <span
                        className={`badge ${
                          test.type === "Proctored" ? "bg-dark" : "bg-label-secondary"
                        }`}
                      >
                        {test.type}
                      </span>
                    </td>
                  </tr>
                ))}
                {tests.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-muted">
                      No Xobin tests available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmationModal
        open={confirmOpen}
        handleClose={() => setConfirmOpen(false)}
        dialogData={dialogData}
        handleSubmit={handleFetchConfirm}
      />
    </>
  );
}
