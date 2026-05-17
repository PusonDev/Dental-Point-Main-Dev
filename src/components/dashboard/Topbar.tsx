"use client";
import React from "react";

export default function Topbar({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full border-b bg-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2">☰</button>
        <h3 className="text-lg font-medium">Admin Panel</h3>
      </div>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}
