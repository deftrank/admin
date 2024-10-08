import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";

export default function CareerDomain() {
  const data = [
    {
      src: "streamline:desktop-code",
      label: "Backend",
    },
    {
      src: "la:code",
      label: "Frontend",
    },
    {
      src: "tdesign:cloud",
      label: "cloud",
    },
    {
      src: "octicon:device-mobile-24",
      label: "Mobile App Development",
    },
    {
      src: "bx:data",
      label: "Data Science",
    },
    {
      src: "mingcute:ai-line",
      label: "AI/ML",
    },
    {
      src: "hugeicons:computer-settings",
      label: "Automation Testing",
    },
    {
      src: "icon-park-solid:source-code",
      label: "User Interface Development",
    },
  ];
  const headers = [
    { label: "Name" },
    { label: "Backend" },
    { label: "Frontend" },
    { label: "Cloud" },
    { label: "Mobile" },
  ];
  const currentItems = [
    {
      id: 1,
      Name: "Complexity",
      Backend: "High",
      Frontend: "Medium",
      Cloud: "High",
      Mobile: "Medium",
    },
    {
      id: 2,
      Name: "Avg. Learning Time",
      Backend: "3 months",
      Frontend: "6 months",
      Cloud: "3 months",
      Mobile: "9 months",
    },
    {
      id: 3,
      Name: "Avg. Salary (p.a)",
      Backend: "5-6 LPA",
      Frontend: "7-8 LPA",
      Cloud: "5-6 LPA",
      Mobile: "15-18 LPA",
    },
    {
      id: 4,
      Name: "Market Demand",
      Backend: "High",
      Frontend: "Moderate",
      Cloud: "Low",
      Mobile: "High",
    }
  ];
  useEffect
  (() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="row mb-3">
        {data.map((item) => (
          <div className="col-md-3 mb-3" key={item.label}>
            <div
              className="border d-flex align-items-center justify-content-center rounded-4 flex-column py-2"
              style={{ width: 150, height: 150 }}
            >
              <Icon icon={item.src} className="fs-2 mb-3" />
              <h6 className="font-size-14 text-center">{item.label}</h6>
            </div>
          </div>
        ))}
      </div>
      <h6 className="font-size-20" style={{ fontSize: 24, fontWeight: 700 }}>
        Comparison Table
      </h6>
      <p className="font-size-14 ">
        Select the option below that best suits you
      </p>

      <Table
        responsive="sm"
        className="thead"
        style={{ background: "var(--Chip-Purple, rgba(65, 105, 224, 0.12))" }}
      >
        <thead className="thead rounded-0">
          <tr>
            {headers.map((header, index) => (
              <th className="font-size-14 text-start" key={index} >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white leader-body">
          {currentItems.length == 0 && (
            <>
              <tr>
                <td colSpan={8} className={"text-center py-4 fs-4"}>
                  No data found
                </td>
              </tr>
            </>
          )}
          {currentItems.map((item) => (
            <tr key={item?.id}>
              <td className="font-size-14 text-start" style={{ fontSize: 14 }}> {item?.Name}</td>
              <td className=" text-start" style={{ fontSize: 14 }}>{item.Backend}</td>
              <td className=" text-start" style={{ fontSize: 14 }}>{item.Frontend}</td>

              <td style={{ fontSize: 14 }} className={"text-start"}>{item?.Cloud}</td>
              <td className=" text-start" style={{ fontSize: 14 }}>{item?.Mobile}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
