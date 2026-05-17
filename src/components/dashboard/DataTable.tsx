"use client";
import React from "react";

type Column = { key: string; title: string };

export default function DataTable({ columns, rows }: { columns: Column[]; rows: any[] }) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="text-left px-4 py-3 text-sm font-medium">
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id || i} className="border-t hover:bg-gray-50">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 text-sm">
                  {String(r[c.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
