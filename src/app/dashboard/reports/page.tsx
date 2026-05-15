"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Report } from "@/types";

export default function ReportsPage() {
  const { t } = useLanguage();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reports")
      .then((r) => r.json())
      .then((d) => setReports(d.reports || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold text-primary mb-4">{t.dashboard.reports}</h1>
      {loading ? (
        <p className="text-gray-500">{t.common.loading}</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-500 text-sm">No reports uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {reports.map((r) => (
            <li key={r.id} className="card flex justify-between items-center text-sm">
              <div>
                <p className="font-medium">{r.file_name}</p>
                <p className="text-gray-500 text-xs">{r.file_type} · {new Date(r.uploaded_at).toLocaleDateString()}</p>
              </div>
              <a href={r.file_url} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold text-sm">
                View
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
